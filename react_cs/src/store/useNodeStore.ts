// import { create } from 'zustand'
// import { DataNode } from '../models';
// import { Edge } from 'reactflow';

// interface NodeState {
//     nodes: DataNode[];
//     edges: Edge[];

//     addNode: (new_node: DataNode) => void;
//     removeNodeById: (node_id: string) => void;
//     removeNodes: (nodes: DataNode[]) => void;
//     updateNodeDataValue: (node_id: string, data_value: any) => void;
// }

// export const useNodeStore = create<NodeState>()((set, get) => ({
//     // initial state
//     nodes: [],
//     edges: [],

//     // methods for manipulating nodes
//     addNode: (new_node: DataNode) => {
//         set({
//             nodes: get().nodes.concat(new_node),
//         });
//     },

//     removeNodeById: (node_id: string) => {
//         set({
//             nodes: get().nodes.filter(n => n.id === node_id)
//         });
//     },

//     removeNodes: (del_nodes: DataNode[]) => {
//         set({
//             nodes: get().nodes.filter(n => !del_nodes.some(dn => dn.id === n.id))
//         });
//     },

//     updateNodeDataValue: (node_id: string, data_value: any) => {
//         set({
//             nodes: get().nodes.map((node) => {
//                 if (node.id === node_id) {
//                     return {
//                         ...node,
//                         data: {
//                             ...node.data,
//                             value: data_value
//                         }
//                     };
//                 }
//                 return node;
//             })
//         });
//     },
// }))