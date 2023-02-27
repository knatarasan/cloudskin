// https://blog.bitsrc.io/zustands-guide-to-simple-state-management-12c654c69990
// https://blog.openreplay.com/zustand-simple-modern-state-management-for-react    <- Refer this for Persisting management
   

import { persist } from "zustand/middleware";
import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

//  This is change is for persisting the state
let store = ((set, get) => ({
  nodes: [],
  edges: [],
  user: { username: "", email: "", loggedIn: false, access_token: "" },
  plan: {
    deploy_status: 1,
    running_status: 1,
  },

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

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

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

  updateNodeColor: (nodeId, color, idx) => {
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

  setNodes: (node) => {
    console.log("setNodes");
    set((state) => ({
      nodes: state.nodes.concat(node),
    }));
  },

  setEdges: (edge) => {
    set((state) => ({
      edges: state.edges.concat(edge),
    }));
  },

  emptyNodes: () => {
    set((state) => ({
      nodes: [],
    }));
  },

  emptyEdges: () => {
    set((state) => ({
      edges: [],
    }));
  },
}));

store = persist(store, {name: "useStore"});
export const useStore = create(store);
