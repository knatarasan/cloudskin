// https://blog.bitsrc.io/zustands-guide-to-simple-state-management-12c654c69990
// https://blog.openreplay.com/zustand-simple-modern-state-management-for-react    <- Refer this for Persisting management

import { persist } from "zustand/middleware";
import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";
import LRUCache from "lru-cache";

// This  is placeholder for LRU Cache
const lru_cache = new LRUCache({ max: 3 });
//  This is change is for persisting the state
let store = (set, get) => ({
  nodes: [],
  edges: [],
  user: { username: "", email: "", loggedIn: false, access_token: "" },
  plan: {
    deploy_status: 1,
    running_status: 1,
  },

  ec2_instance_types: {},

  addUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },

  addPlan: (plan) => {
    set((state) => ({
      plan: plan,
    }));
  },

  // Node operation
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNode: (nodeId, api_object) => {
    // TODO instead of scanning entire array, can it be done by index?
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId.toString()) {
          node.data = { ...node.data, api_object };
        }
        return node;
      }),
    });
  },

  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId.toString()) {
          node.data = { ...node.data, label: label };
        }
        return node;
      }),
    });
  },


  updateNodeColor: (nodeId, color) => {
    // TODO instead of scanning entire array, can it be done by index?
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId.toString()) {
          // node.data = { ...node.data, label: color };
          node.selected = true

        }
        return node;
      }),
    });
  },
  setNodes: (node) => {
    console.log("setNodes");
    set((state) => ({
      nodes: state.nodes.concat(node),
    }));
  },
  emptyNodes: () => {
    set((state) => ({
      nodes: [],
    }));
  },

  emptyPlan: () => {
    set((state) => ({
      plan: {},
    }));
  },

  emptyContext: () => {
    set((state) => ({
      nodes: [],
      edges: [],
      plan: {},
    }));
  },
// End of Node operation

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  updateEc2_instance_types: (region, ec2_instance_type_list) => {
    set({
      ec2_instance_types: {
        ...get().ec2_instance_types,
        [region]: ec2_instance_type_list,
      },
    });
  },
  emptyEc2_instance_types: () => {
    set((state) => ({
      ec2_instance_types: [],
    }));
  },

  setEdges: (edge) => {
    set((state) => ({
      edges: state.edges.concat(edge),
    }));
  },


  removeNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    }));
  },

  emptyEdges: () => {
    set((state) => ({
      edges: [],
    }));
  },

  // place hoder for LRU Cache
  // add a function to set the state with caching
  setCaching: (key, value) => {
    lru_cache.set(key, value); // add the value to the cache
    set({ [key]: value }); // set the state
  },

  // place hoder for LRU Cache
  // add a function to get the state with caching
  getCaching: (key) => {
    const cachedValue = lru_cache.get(key); // get the value from the cache
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    const value = get()[key]; // get the value from the store
    lru_cache.set(key, value); // add the value to the cache
    return value;
  },
});

store = persist(store, { name: "useStore" });
export const useStore = create(store);
