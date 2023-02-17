import { create } from "zustand";

const useStore = create((set) => ({
  fruits: ["apple", "banana", "orange"],
  vegies: {
    root: ["potato", "carrot", "beet"],
    leaf: ["lettuce", "spinach", "kale"],
    stem: ["broccoli", "cauliflower", "celery"],
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
}));

export default useStore;
