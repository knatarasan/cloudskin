import React, { useState, useRef, useCallback, useEffect, memo, DragEvent, useContext } from "react";
import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  useReactFlow,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowInstance,
  OnConnect,
  Position,

} from "reactflow";
import "reactflow/dist/style.css";
import {
  // createPlan,
  // updatePlan,
  createInstance,
} from "../../services/api.service";
import Sidebar from "./Sidebar";
import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";
import "./CloudCanvas.css";
import { UserContext } from "../../context/Context";
import { useParams } from 'react-router-dom';

const initialNodes: Node[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { plan_id_edit } = useParams()
  // console.log("param id ", plan_id_edit)
  const [planId, setPlanId] = useState<number | null>(null);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  // const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  // const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // const [ec2Id, setEc2Id] = useState(null);
  const [nodeData, setNodeData] = useState(null);
  const [health, setHealth] = useState("red");
  const [save_update, setSaveUpdate] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  // const { setViewPort } = useReactFlow();


  // useEffect(() => {
  //   console.log("inside useEffect", health);
  //   if (nodeData !== null) {
  //     nodeData.style["background"] = health;
  //     setNodeData(nodeData);
  //   }
  // }, [health]);

  // const onConnect = useCallback((params) =>
  //   setEdges(
  //     (eds) => {
  //       params["animated"] = true;
  //       params["style"] = { stroke: "red" };
  //       return addEdge(params, eds);
  //     },
  //     [setEdges]
  //   )
  // );

  useEffect(() => {

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.tokenAccess,
      },
    };
    fetch(`/plan/${plan_id_edit}`, requestOptions).then((response) => {
      setPlanId(Number(plan_id_edit))
      
      if(Number(plan_id_edit) ){
        setSaveUpdate(false)
      }
      return response.json()
    }).then((data) => {
      const flow = JSON.parse(data.plan);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        // setViewPort({ x, y, zoom });
      }
    })
  }, [])

  const onConnect = useCallback<OnConnect>(
    (params: Edge | Connection): void => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // const retrievePlan = useCallback(() => {
  //   const restoreFlow = async () => {

  //   };
  //   restoreFlow();

  // }, [setNodes]);
  // // }, [setNodes, setViewPort]);


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

    console.log('BEFORE save or update ',planId);
    if (!planId && reactFlowInstance) {
      console.log("For save", planId);
      const flow = reactFlowInstance.toObject();
      const flow_obj = JSON.stringify(flow, getCircularReplacer())
      localStorage.setItem("flow-persist", flow_obj);

      const plan_obj = {
        plan: flow_obj,
        // name: 'unnammed',
        deploy_status: 'PREPARED',
        running_status: 'NA',

      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + currentUser.tokenAccess
        },
        body: JSON.stringify(plan_obj),
      };
      fetch("/plan/", requestOptions).then((response) => {
        return response.json();
      }).then((data) => {
        setPlanId(data.id);
        setSaveUpdate(false);
        console.log('Plan successfully saved ', data.id)
      })
    } else if (reactFlowInstance) {
      // update plan
      console.log("For update", planId);
      const flow = reactFlowInstance.toObject();
      const data = {
        plan: JSON.stringify(flow),
        deploy_status: 'Prepared',
        running_status: 'Stopped'
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser.tokenAccess,
        },
        body: JSON.stringify(data),
      }
      fetch(`/plan/${planId}`, requestOptions).then((response) => {
        return response.json();
      }).then((data) => {
        console.log('Plan successfully updated ', data.id)
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
    console.log("dragging ")
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
      console.log("dropped ")
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

  // const onContextMenu = (e, node) => {
  //   setNodeData(node);
  //   e.preventDefault();
  //   setPosition({ x: e.clientX, y: e.clientY });
  //   setIsOpen(true);
  //   console.log("onContextMenuNode", node.id);
  // };

  // const ContextMenu = memo(({ isOpen, position, actions = [], onMouseLeave }) =>
  //   isOpen ? (
  //     <div
  //       style={{
  //         position: "absolute",
  //         left: position.x,
  //         top: position.y,
  //         zIndex: 1000,
  //         border: "solid 1px #CCC",
  //         borderRadius: 3,
  //         backgroundColor: "white",
  //         padding: 5,
  //         display: "flex",
  //         flexDirections: "column",
  //       }}
  //       onMouseLeave={onMouseLeave}
  //     >
  //       {actions.map((action) => (
  //         <button key={action.label} onClick={action.effect}>
  //           {action.label}
  //         </button>
  //       ))}
  //     </div>
  //   ) : null
  // );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />

        <div id="main-canvas" className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // onNodeContextMenu={onContextMenu}
            fitView
          >
            {/* <ContextMenu
              isOpen={isOpen}
              position={position}
              onMouseLeave={() => setIsOpen(false)}
              actions={[
                { label: "Create Instance", effect: onCreate },
                { label: "Update Status", effect: updateNode },
              ]}
            /> */}
            <Controls />
            <div className="save__controls">
              {/* <span style='font-size:50px;'>&#128308;</span> */}

              <button id='save_update' onClick={onSave}>
                {save_update ? "Save Plan" : "Update Plan"}
              </button>
              {/*              <button onClick={onCreate}>Create Instance</button>
            <button onClick={updateNode}>Refresh Status</button> */}
              {/* <button onClick={onRestore}>Restore - !working</button> */}
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
