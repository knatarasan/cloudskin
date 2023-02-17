import { create } from "zustand";
import { applyNodeChanges } from "reactflow";

const useStore = create((set, get) => ({
  nodes: [],
  fruits: ["apple", "banana", "orange"],
  vegies: {
    root: ["potato", "carrot", "beet"],
    leaf: ["lettuce", "spinach", "kale"],
    stem: ["broccoli", "cauliflower", "celery"],
  },

  plan: {
    deploy_status: 1,
    running_status: 1,
  },

  addFruits: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },

  addStems: (stem) => {
    set((state) => ({
      vegies: { ...state.vegies, stem: [...state.vegies.stem, stem] },
    }));
  },

  addPlan: (plan) => {
    set((state) => ({
      plan: plan,
    }));
  },



  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNodeColor: (nodeId, color) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the cahnges
          node.data = { ...node.data, label: color };
        }

        return node;
      }),
    });
  },

  setNodes: (node) => {
    console.log('setNodes');
    set((state) => ({
      nodes: state.nodes.concat(node),
    }));
  }

  
  // setNodes((nds) => nds.concat(new_node));

}));

export default useStore;
