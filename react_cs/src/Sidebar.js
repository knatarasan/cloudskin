import React from 'react';

import appimg from "./constants/app.png"
import lbimg from "./constants/loadbalancer.png"


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
        <img src={appimg} height="50" width="50" />
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'LB')} draggable>
        <img src={lbimg} height="50" width="50" />
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'arrow')} draggable>
        Arrow
      </div>
    </aside>
  );
};
