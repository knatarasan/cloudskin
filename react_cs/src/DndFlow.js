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
import { createGraph } from "./services/api.service";

import Sidebar from "./Sidebar";

import "./index.css";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [graph, setGraph] = useState({});
  const [graphId, setGraphId] = useState(null)
  console.log('HERE', graph, graphId)
  console.log("setting graphid again")
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

  const onSave = useCallback(() => {
    console.log("graphId", graphId,graph)
    // fetch call is made with data object , but react takes care adding owner_id: 2
    if (graphId) {
      console.log("graph exists");
    } else if (reactFlowInstance) {
      console.log("id not in graph, saving newly created graph");
      const flow = reactFlowInstance.toObject();
      // console.log("GRAPH ID",reactFlowInstance.id)
      // Graph stored locally
      localStorage.setItem("flow-persist", JSON.stringify(flow));

      // Graph stored in server
      createGraph(flow).then((data) => {
        console.log("flow", data);
        setGraphId(data.id);
        setGraph(data);
      });
      
      // console.log('some ',some)
    }
  }, [reactFlowInstance]);

  // useEffect(() => {
  //   setGraphId(graphId++);
  // }, graphId);

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
      console.log("Dropped", type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        // type,
        position,
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
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
              <button onClick={onSave}>save</button>
              <button onClick={onRestore}>restore</button>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
