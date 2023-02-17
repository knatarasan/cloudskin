// https://blog.bitsrc.io/zustands-guide-to-simple-state-management-12c654c69990
// https://blog.openreplay.com/zustand-simple-modern-state-management-for-react

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

  updateNodeColor: (nodeId , color,idx) => {

    // TODO instead of scanning entire array, can it be done by index?
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId.toString()) {
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
