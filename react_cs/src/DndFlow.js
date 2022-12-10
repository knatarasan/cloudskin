import React, { useState, useRef, useCallback, useEffect } from "react";
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
  displayHealth,
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
  const [save_update, setSaveUpdate] = useState(true);
  const { setViewPort } = useReactFlow();

  // console.log("GRAPH ID",reactFlowInstance.id)
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
        console.log("graphData", data);
        setGraphId(data.id);
        setSaveUpdate(false);
        console.log("onSave graph created id", data.id);
      });
    }
  };

  const onCreate = () => {
    createInstance().then((data) => {
      console.log("ec2Data", data);
      setEc2Id(data.id);
    });
    console.log("ec2Id", ec2Id);
    displayHealth(ec2Id);
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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      // console.log("Dropped", type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const createNewNode = (icon, size) => {
        let comp = null;

        if (icon === "App") {
          comp = <EC2Icon size={size} />;
        } else if (icon === "LB") {
          comp = <LoadBalancerIcon size={size} />;
        }
        console.log("comp", typeof comp);
        return {
          id: getId(),
          position,
          sourcePosition: "right",
          targetPosition: "left",
          style: { border: "100px", width: "5%" },
          data: { label: comp },
        };
      };

      setNodes((nds) => nds.concat(createNewNode(type, 25)));
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
              <button onClick={onSave}>
                {save_update ? "save" : "update"}
              </button>
              <button onClick={onCreate}>create</button>
              <button onClick={onRestore}>restore</button>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
