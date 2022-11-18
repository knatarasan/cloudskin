import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">PALETTE</div>
      <div className="dndnode input" onDragStart={(event) => {console.log('Drag started'); 
      return onDragStart(event, 'App')}} draggable>
        App
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'LB')} draggable>
        LB
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'arrow')} draggable>
        Arrow
      </div>
    </aside>
  );
};
