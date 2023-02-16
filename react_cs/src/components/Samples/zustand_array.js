
import create from 'zustand';
import { useRef } from 'react';

const useStore = create(set => ({
  fruits : ['apple', 'banana', 'orange'],
  addFruits: fruit => set(state => ({ fruits: [...state.fruits, fruit] })),
}));

const StoreArray = () => {
  const fruits = useStore(state => state.fruits);
  const addFruits = useStore(state => state.addFruits);
  const inputRef = useRef();
  const addFruit = () => {
    addFruits(inputRef.current.value);
    inputRef.current.value = '';
  };
  
  return (
    <div className="App">
      <h1> I have {fruits.length} of fruits</h1>
      <p>Add new fruit</p>
      <input ref={inputRef} />
      <button onClick={addFruit}>Add</button>
      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
        ))}
    </div>
  );
};

export default StoreArray;

// ref: https://blog.openreplay.com/zustand-simple-modern-state-management-for-react
