import { useCallback, useState } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import initialNodes from "./node.js";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

function Palette() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => {
      // console.log('from useCallback , ')
      return setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
        <ReactFlow
          id="25"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />
  );
}

export default Palette;
