import React, { useRef, useCallback, useEffect, useContext, useState as useStateVan } from "react";
// import useState from 'react-usestateref';
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
import CompPropSidebar from "./CompPropSidebar";
import AWSCompNode from "./AWSCompNode";

const nodeTypes = {
  awsCompNode: AWSCompNode,
};


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { plan_id_edit } = useParams()
  const [planId, setPlanId, planIdRef] = useState<number>(-1);   // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  const [plan, setPlan, planRef] = useState<any>({});
  // const [reactFlowInstance, setReactFlowInstance, reactFlowInstanceRef] = useState<ReactFlowInstance>()
  const [reactFlowInstance, setReactFlowInstance, reactFlowInstanceRef] = useState<any>()

  const [clickedNode, setClickedNode] = useStateVan({})
  const planCreatedRef = useRef(false);                         // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)
  // Ref : https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react#:~:text=This%20is%20because%20outside%20of,your%20hook%20has%20been%20ran.
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  // const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [save_update, setSaveUpdate] = useStateVan(true);


  const onSave = () => {
    console.log("in onSave", reactFlowInstance, reactFlowInstanceRef, planIdRef.current)
    if (reactFlowInstanceRef.current) {

      // update plan
      const flow = reactFlowInstanceRef.current.toObject();

      flow.nodes.map((node) => {
        if (node.data.label.props) {
          node.data.label = node.data.label.props.comp
        }
      })

      // console.log('reactFLowinstance', reactFlowInstanceRef.current)
      // console.log('flow', flow)
      const plan_wrapper = {
        plan: flow,
        deploy_status: 1,
        running_status: 1,
      };

      authAxios.put("/plan/" + `${planIdRef.current}`, plan_wrapper)
        .then((response) => {
          console.log("Plan successfully updated", response.data.id)
        })
        .catch((error) => {
          console.log("Plan not updated", error)
        })
    }

  }

  useEffect(() => {

    // componentDidMount
    authAxios.get("/plan/" + `${plan_id_edit}`)
      .then((response) => {
        setPlanId(Number(plan_id_edit))
        setPlan(response.data)
        planCreatedRef.current = true;
        if (Number(plan_id_edit)) {
          setSaveUpdate(false)
        }
        const flow = response.data.plan
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
    // componentDidMount

    // componentWillUnMount
    return () => {
      console.log('comp did unmount here', reactFlowInstance, reactFlowInstanceRef);
      onSave() // BUG this save doesn't work since reactFlowInstance got lost before save function called

    }
    // componentWillUnMount
  }, [])


  const onConnect = useCallback<OnConnect>(
    (params: Edge | Connection): void => setEdges((eds) => {

      console.log('on connect param', params);
      console.log('TODO add connectivity between ', params.source, ' to ', params.target)

      return addEdge(params, eds)
    }
    ),
    [setEdges]
  );

  const onEdgesDelete = useCallback<any>(
    (params: Edge[]): void => {
      console.log('Edges deleted', params)
    }, []
  );

  const onNodeDelete = (nodes: any): void => {
    // console.log('This node will be deleted ', nodes);

    nodes.map((node: any) => {
      const endpoint = node.data.api_object.aws_component;

      authAxios.delete(`/${endpoint}/${node.data.api_object.id}`)
        // .then((response) => {
        //   // console.log("AWS component has been deleted")
        // })
        .catch((error) => {
          console.log("AWS component not deleted", error)
        })
    })

  }

  const deployPlan = () => {
    const plan_clone = structuredClone(planRef.current)
    plan_clone.deploy_status = 2
    console.log('plan_clone', plan_clone)
    authAxios.put("/plan/" + `${planIdRef.current}`, plan_clone)
      .then((response) => {
        console.log("Plan deployment activated", response.data)
        setPlan(response.data)
        // plan.deploy_status = 2
      })
      .catch((error) => {
        console.log("Plan deployment activation failed", error)
      })
  }

  const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const createAWSComponent = async (name: string) => {
    // console.log("AWS Comp create called ", comp, plan_id)
    const aws_component = {
      "plan": planIdRef.current
    }

    return await authAxios.post(`/${name}/`, aws_component)
      .then((response) => {
        // console.log("AWS Comp created", response.data)
        return response.data
      })
      .catch((error) => {
        console.log("AWS Comp not created", error.response.status)
      })
  }

  const createNewNode = (name: string, size: number, color: string, event: React.DragEvent<HTMLDivElement>): void => {
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) || { x: 0, y: 0 }

    // TO USE SVG check this https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs

    createAWSComponent(name)
      .then((awsComp) => {
        const new_node: Node<any> = {
          id: awsComp.id.toString(),
          type: 'awsCompNode',
          position,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          // style: { border: "100px", width: "5%", background: color },
          style: {  height:"50px", width: "50px"},

          // data: { label: name+' '+awsComp.id.toString(), api_object: awsComp },
          data: { label: awsComp.id.toString(), attachable: '', api_object: awsComp, color: 'red' },
        };
        console.log('new_node ', new_node)
        setNodes((nds) => nds.concat(new_node));
      })
  };

  const onNodeClick = (event: any, node: any) => {
    setClickedNode({})
    setClickedNode(node.data)
    // console.log('clickedNode ', clickedNode)
  }

  const onPaneClick = (event: any) => {
    setClickedNode({})
  }

  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();


      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))

      // dropped node is attachable type 
      if (data.nodeType === 'attachable') {
        const reactFlowBounds: any = reactFlowWrapper.current?.getBoundingClientRect();
        let centerX = 0
        let centerY = 0
        const pos: any = reactFlowInstance?.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        centerX = pos.x;
        centerY = pos.y;

        const targetNode: any = reactFlowInstanceRef.current?.getNodes().find(
          (n: any) =>
            centerX > n.position.x &&
            centerX < n.position.x + n.width &&
            centerY > n.position.y &&
            centerY < n.position.y + n.height
          // n.id !== node.id // this is needed, otherwise we would always find the dragged node
        );

        // setTarget(targetNode);
        console.log('node found ', targetNode)

        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === targetNode.id) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                ...node.data,
                attachable: 'pg'
              };
            }
            return node;
          })
        );

        /*
          1. Trigger Holder to accept attachable
          2. Make a backend call to deploy attachable
        */
        return
      }
      // dropped node is attachable type 


      if (planIdRef.current && planCreatedRef.current) {
        console.log('To augment existing plan ', planIdRef)
        createNewNode(data.node, 25, "red", event)
      } else {
        planCreatedRef.current = true;        // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)

        //create plan
        const plan_obj = {
          plan: {},
          deploy_status: 1,
          running_status: 1,
        };

        authAxios.post("/plan/", plan_obj)
          .then((response) => {
            const new_plan_id = Number(response.data.id)
            setPlanId(new_plan_id)
            setPlan(response.data)
            setSaveUpdate(false)
            console.log("plan created", planIdRef.current)
          }).then(() => {
            createNewNode(data.node, 25, "red", event)
          })
          .catch((error) => {
            console.log("Plan not saved", error.response.status)
          })
        //create plan 

      }
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
            onNodesDelete={onNodeDelete}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <div className="save__controls">
              <button id='save_update' onClick={onSave}> Save Plan</button>(This button is only for testing)<br />
              <button onClick={deployPlan}>Deploy Plan</button>
              <h1>{planRef.current.deploy_status}</h1> <h5>There is a bug in save plan & deploy plan cycle</h5>
              <p>Plan id : {planId} is plan exist: {planCreatedRef.current}</p>

              {"label" in clickedNode ? <CompPropSidebar node={clickedNode} /> : null}
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
