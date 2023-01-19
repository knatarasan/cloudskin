import React, { useRef, useCallback, useEffect, useContext } from "react";
import useState from 'react-usestateref';

import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  ReactFlowInstance,
  OnConnect,
  Position,

} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";
import "./CloudCanvas.css";
import { UserContext } from "../../context/Context";
import { useParams } from 'react-router-dom';
import { api_host } from "../../env/global";
import { authAxios } from "../auth/AuthServiceAxios";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Input from "../editor/Input";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { plan_id_edit } = useParams()
  // const [planId, setPlanId] = useState<number>(-1);
  const [planId, setPlanId, planIdRef] = useState<number>(-1);   //https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  const planCreatedRef = useRef(false);                // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)
  // Ref : https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react#:~:text=This%20is%20because%20outside%20of,your%20hook%20has%20been%20ran.

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  // const [nodeData, setNodeData] = useState(null);
  // const [health, setHealth] = useState("red");
  const [save_update, setSaveUpdate] = useState(true);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // planIdRef.current = planId;
  const [instanceType, setInstanceType] = useState("")

  console.log("instancetype", instanceType)
  useEffect(() => {
    authAxios.get("/plan/" + `${plan_id_edit}`)
      .then((response) => {
        setPlanId(Number(plan_id_edit))
        if (Number(plan_id_edit)) {
          setSaveUpdate(false)
        }
        const flow = JSON.parse(response.data.plan)
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
        }
        console.log("Plan successfully retrieved", response.data.id)
      })
      .catch((error) => {
        console.log(plan_id_edit, ' is not right plan id to edit', error);
      })
  }, [])

  const onConnect = useCallback<OnConnect>(
    (params: Edge | Connection): void => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  const onSave = () => {

    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key: string, value: string) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };


    if (reactFlowInstance) {
      // update plan
      console.log("This is to update plan", planId);
      const flow = reactFlowInstance.toObject();
      const flow_obj = JSON.stringify(flow, getCircularReplacer())

      const plan_obj = {
        plan: flow_obj,
        // name: 'unnammed',
        deploy_status: 1,
        running_status: 1,
      };

      authAxios.put("/plan/" + `${planId}`, plan_obj)
        .then((response) => {
          // console.log('axios res UPDATE', response);
          console.log("Plan successfully updated", response.data.id)
        })
        .catch((error) => {
          console.log("Plan not updated", error)
        })
    }
  }

  const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);



  const createAWSComponent = async (comp: string) => {
    // console.log("AWS Comp create called ", comp, plan_id)
    const aws_component = {
      "plan": planIdRef.current
    }

    return await authAxios.post("/ec2/", aws_component)
      .then((response) => {
        console.log("AWS Comp created", response.data)
        return response.data
      })
      .catch((error) => {
        console.log("AWS Comp not created", error.response.status)
      })
  }

  const createNewNode = (icon: string, size: number, color: string, event: React.DragEvent<HTMLDivElement>): void => {
    console.log('Door steps of createNewNode')
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) || { x: 0, y: 0 }

    let comp = "";


    if (icon === "App") {
      // comp = <EC2Icon size={size} />;
      comp = "EC2"
    } else if (icon === "LB") {
      // comp = <LoadBalancerIcon size={size} />;
      comp = "LB"
    }

    createAWSComponent(comp)
      .then((awsComp) => {
        const new_node: Node<any> = {
          id: getId(),
          position,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: { border: "100px", width: "5%", background: color },
          data: { label: comp + awsComp.id.toString(), api_object: awsComp },
        };
        setNodes((nds) => nds.concat(new_node));
      })
  };

  const customSideBar = (event: any, node: any) => {
    console.log('click node', node);
    setInstanceType(node.data.api_object.instance_type);

  }



  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))

      if (planCreatedRef.current) {
        createNewNode(data.nodeType, 25, "red", event)
      } else {
        planCreatedRef.current = true;        // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)

        //create plan
        console.log("This is to create new plan", planId);
        const plan_obj = {
          plan: {},
          // name: 'unnammed',
          deploy_status: 1,
          running_status: 1,
        };

        authAxios.post("/plan/", plan_obj)
          .then((response) => {
            const new_plan_id = Number(response.data.id)
            setPlanId(new_plan_id)
            setSaveUpdate(false)
            console.log("plan created", planIdRef.current)
          }).then(() => {
            createNewNode(data.nodeType, 25, "red", event)
          })
          .catch((error) => {
            console.log("Plan not saved", error.response.status)
          })
        //create plan 

      }
      console.log('nodes', nodes)
    },
    [reactFlowInstance]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={customSideBar}
            fitView
          >
            <Controls />
            <div className="save__controls">
              <button id='save_update' onClick={onSave}> Save Plan

                {/* {save_update ? "Save Plan" : "Update Plan"} */}
              </button>
              <p>AWS Component Properties:</p>
              <div id='node_props'>
              <input type="text" placeholder="instance type" value={instanceType} onChange={(e) => setInstanceType(e.target.value)}></input><br />
              <input type="text" placeholder="image id"></input><br />
              <input type="text" placeholder="region"></input><br />
              <input type="text" placeholder="security group"></input><br />
              <input type="text" placeholder="subnet"></input><br />
              </div>
            </div>
            <div>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
