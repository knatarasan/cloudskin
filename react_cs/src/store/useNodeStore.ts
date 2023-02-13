import { create } from 'zustand'
import { CustomNode } from '../models/NodeTypes';
import { applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, NodeChange, OnEdgesChange, OnNodesChange } from 'reactflow';


// define types for state values and actions separately
type State = {
    nodes: CustomNode[];
    edges: Edge[];
}

type Actions = {
    addNode: (new_node: CustomNode) => void;
    removeNodeById: (node_id: string) => void;
    removeNodes: (nodes: CustomNode[]) => void;
    updateNodeDataValue: (node_id: string, data_value: any) => void;

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;

    resetNodes: (nodes: CustomNode[]) => void;
    resetEdges: (edges: Edge[]) => void;
}

// define the initial state
const initialState: State = {
    nodes: [
        // { id: '1', type: 'container', data: { id: '1', schemaId: 'ec2', label: 'EC2-1', properties: '' }, position: { x: 5, y: 5 } },
        // { id: '2', type: 'process', data: { id: '2', schemaId: 'pg', label: 'PostgreSQL', properties: '' }, position: { x: 5, y: 100 } },
    ],
    edges: [],
}

export const useNodeStore = create<State & Actions>()((set, get) => ({
    ...initialState,

    // methods for manipulating nodes
    addNode: (newNode: CustomNode) => {
        set({
            nodes: get().nodes.concat(newNode),
        });
    },

    removeNodeById: (nodeId: string) => {
        set({
            nodes: get().nodes.filter(n => n.id !== nodeId)
        });
    },

    removeNodes: (nodes: CustomNode[]) => {
        set({
            nodes: get().nodes.filter(n => !nodes.some(dn => dn.id === n.id))
        });
    },

    updateNodeDataValue: (nodeId: string, data_value: any) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        // data: {
                        //     ...node.data,
                        //     value: data_value
                        // }
                    };
                }
                return node;
            })
        });
    },

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    resetNodes: (nodes: CustomNode[]) => {
        set({
            nodes: nodes,
        });
    },

    resetEdges: (edges: Edge[]) => {
        set({
            edges: edges,
        });
    },

}))


// export const useNodes = () => useNodeStore((state) => state.nodes)
// export const useEdges = () => useNodeStore((state) => state.edges)
