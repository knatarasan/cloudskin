import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
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

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { plan_id_edit } = useParams()
  // console.log("param id ", plan_id_edit)
  const [planId, setPlanId] = useState<number | null>(null);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  const [nodeData, setNodeData] = useState(null);
  const [health, setHealth] = useState("red");
  const [save_update, setSaveUpdate] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    authAxios.get("/plan/"+`${plan_id_edit}`)
      .then((response) => {
        console.log('axios res useEffect', response);
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

        if (response.status >= 200 && response.status < 300) {
          console.log("Plan successfully retrieved", response.data.id)
        } else {
          console.log("Plan not retrieved", response.status)
        }
      })
      .catch((error) => {
        console.log(error);
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

    console.log('BEFORE save or update ', planId, reactFlowInstance);

    if (!planId && reactFlowInstance) {
      console.log("For save", planId);
      const flow = reactFlowInstance.toObject();
      const flow_obj = JSON.stringify(flow, getCircularReplacer())
      localStorage.setItem("flow-persist", flow_obj);

      const plan_obj = {
        plan: flow_obj,
        // name: 'unnammed',
        deploy_status: 1,
        running_status: 1,
      };

      authAxios.post("/plan/", plan_obj)
        .then((response) => {
          // console.log('axios res SAVE', response);
          if (response.status >= 200 && response.status < 300) {
            setPlanId(Number(response.data.id))
            setSaveUpdate(false)
            console.log("Plan successfully saved", response.data.id)
          } else {
            console.log("Plan not saved", response.status)
          }
        })
        .catch((error) => {
          console.log(error);
        })


    } else if (reactFlowInstance) {
      // update plan
      console.log("For update", planId);
      const flow = reactFlowInstance.toObject();
      const data = {
        plan: JSON.stringify(flow),
        deploy_status: 1,
        running_status: 1
      };

      authAxios.put("/plan/"+`${planId}`, data)
        .then((response) => {
          // console.log('axios res UPDATE', response);
          if (response.status >= 200 && response.status < 300) {
            console.log("Plan successfully updated", response.data.id)
          } else {
            console.log("Plan not updated", response.status)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  // const onCreate = (e) => {
  //   createInstance().then((data) => {
  //     console.log("ec2Data", data.ec2_instance_id);
  //     nodeData.data["instance_id"] = data.ec2_instance_id;
  //     setNodeData(nodeData);
  //     setHealth("orange");
  //     console.log("onCreateNode after nodedata change", nodeData);
  //   });
  // };


  const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // const updateNode = () => {
  //   const instance_id = nodeData.data["instance_id"];
  //   console.log("instance_id", instance_id);
  //   fetch(`http://127.0.0.1:8000/ec2/${instance_id}`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response["ec2_instance_health"].length >= 1) {
  //         setHealth("green");
  //       } else if (response["ec2_instance_health"] === []) {
  //         setHealth("orange");
  //       }
  //     })
  //     .then(console.log("health", health));
  // };

  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) || { x: 0, y: 0 }


      const createNewNode = (icon: string, size: number, color: string): Node<any> => {
        let comp = null;

        if (icon === "App") {
          // comp = <EC2Icon size={size} />;
          comp = "EC2"
        } else if (icon === "LB") {
          // comp = <LoadBalancerIcon size={size} />;
          comp = "LB"
        }

        return {
          id: getId(),
          position,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: { border: "100px", width: "5%", background: color },
          data: { label: comp },
        };
      };

      setNodes((nds) => nds.concat(createNewNode(data.nodeType, 25, "red")));
    },
    [reactFlowInstance]
  );

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
            fitView
          >
            <Controls />
            <div className="save__controls">
              <button id='save_update' onClick={onSave}>
                {save_update ? "Save Plan" : "Update Plan"}
              </button>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
