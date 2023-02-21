import { create } from "zustand";
import React, { useRef } from "react";

const useStore = create((set) => ({
  votes: 0,
  addVotes: () => set((state) => ({ votes: state.votes + 1 })),
  subtractVotes: () => set((state) => ({ votes: state.votes - 1 })),
}));

const Store = () => {
  const addVotes = useStore((state) => state.addVotes);
  const subtractVotes = useStore((state) => state.subtractVotes);
  const getVotes = useStore((state) => state.votes);

  return (
    <div className="App">
      <h1>{getVotes} people have cast their votes</h1>
      <button onClick={addVotes}>Cast a vote</button>
      <button onClick={subtractVotes}>Delete a vote</button>
    </div>
  );
};

export default Store;


// ref: https://blog.openreplay.com/zustand-simple-modern-state-management-for-react