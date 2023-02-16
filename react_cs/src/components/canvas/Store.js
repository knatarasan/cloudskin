import create from 'zustand';

const useStore = create(set => ({
    fruits: ['apple', 'banana', 'orange'],
    addFruits: (fruit) => {
      set(state => ({
        fruits: [...state.fruits, fruit]
      }));
    }
  }));

  
  export default useStore;