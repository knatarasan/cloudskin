import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  createGraph,
  updateGraph,
  createInstance,
} from "./services/api.service";
import Sidebar from "./Sidebar";

import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";

import "./index.css";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [graphId, setGraphId] = useState(null);
  const [ec2Id, setEc2Id] = useState(null);
  const [nodeData, setNodeData] = useState(null);
  const [health, setHealth] = useState("red");
  const [save_update, setSaveUpdate] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { setViewPort } = useReactFlow();

  useEffect(() => {
    console.log("inside useEffect", health);
    if (nodeData !== null) {
      setNodes((nds) => {
        nodeData.style["background"] = health;
      });
    }
  }, [health]);

  const onConnect = useCallback((params) =>
    setEdges(
      (eds) => {
        params["animated"] = true;
        params["style"] = { stroke: "red" };
        return addEdge(params, eds);
      },
      [setEdges]
    )
  );

  const onSave = () => {
    // update graph
    if (graphId && reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      updateGraph(flow, graphId);
      console.log("onSave graph updated id", graphId);
      // create new graph in backend
    } else if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      // Graph stored locally
      localStorage.setItem("flow-persist", JSON.stringify(flow));

      // Graph stored in server
      createGraph(flow).then((data) => {
        setGraphId(data.id);
        setSaveUpdate(false);
      });
    }
  };

  const onCreate = (e) => {
    createInstance().then((data) => {
      console.log("ec2Data", data.ec2_instance_id);
      setNodes((nds) => {
        nodeData.data["instance_id"] = data.ec2_instance_id;
      });
      setHealth("orange");
      console.log("onCreateNode after nodedata change", nodeData);
    });
  };

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flow-persist"));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewPort({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewPort]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNode = () => {
    const instance_id = nodeData.data["instance_id"];
    console.log("instance_id", instance_id);
    fetch(`http://127.0.0.1:8000/ec2/${instance_id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response["ec2_instance_health"].length >= 1) {
          setHealth("green");
        } else if (response["ec2_instance_health"] === []) {
          setHealth("orange");
        }
      })
      .then(console.log("health", health));
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const createNewNode = (icon, size, color) => {
        let comp = null;

        if (icon === "App") {
          comp = <EC2Icon size={size} />;
        } else if (icon === "LB") {
          comp = <LoadBalancerIcon size={size} />;
        }

        return {
          id: getId(),
          position,
          sourcePosition: "right",
          targetPosition: "left",
          style: { border: "100px", width: "5%", background: color },
          data: { label: comp },
        };
      };

      setNodes((nds) => nds.concat(createNewNode(type, 25, "red")));
    },
    [reactFlowInstance]
  );

  const onContextMenu = (e, node) => {
    setNodeData(node);
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
    console.log("onContextMenuNode", node.id);
  };

  const ContextMenu = memo(({ isOpen, position, actions = [], onMouseLeave }) =>
    isOpen ? (
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          zIndex: 1000,
          border: "solid 1px #CCC",
          borderRadius: 3,
          backgroundColor: "white",
          padding: 5,
          display: "flex",
          flexDirections: "column",
        }}
        onMouseLeave={onMouseLeave}
      >
        {actions.map((action) => (
          <button key={action.label} onClick={action.effect}>
            {action.label}
          </button>
        ))}
      </div>
    ) : null
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
            onNodeContextMenu={onContextMenu}
            fitView
          >
            <ContextMenu
              isOpen={isOpen}
              position={position}
              onMouseLeave={() => setIsOpen(false)}
              actions={[
                { label: "Create Instance", effect: onCreate },
                { label: "Update Status", effect: updateNode },
              ]}
            />
            <Controls />
            <div className="save__controls">
              {/* <span style='font-size:50px;'>&#128308;</span> */}
              <button onClick={onSave}>
                {save_update ? "Save Graph" : "Update Graph"}
              </button>
              {/*              <button onClick={onCreate}>Create Instance</button>
            <button onClick={updateNode}>Refresh Status</button> */}
              <button onClick={onRestore}>Restore - !working</button>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
