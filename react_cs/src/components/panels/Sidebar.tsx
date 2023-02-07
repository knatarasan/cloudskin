import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { AWSComponents } from '../../models/AWSComponents';
import { DBComponents } from '../../models/Databases';

const ComponentsBar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: string, nodeType: string) => {
    const id = nanoid();
    const dataString = JSON.stringify({ id, node, nodeType });
    event.dataTransfer.setData('application/reactflow', dataString);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>
      <div className="description">PALETTE</div>
      {
        Object.entries(AWSComponents)
          .map(
            ([key, item]) =>
            (
              <div key={key}
                className="icon"
                onDragStart={(event) => onDragStart(event, item.name, item.componentType)}
                draggable
              >
                <item.icon size={35} />
              </div>
            )
          )
      }
      {
        Object.entries(DBComponents)
          .map(
            ([key, item]) =>
            (
              <div key={key}
                className="icon"
                onDragStart={(event) => onDragStart(event, item.name, item.componentType)}
                draggable
              >
                <item.icon size={35} />
              </div>
            )
          )
      }
    </aside>
  );
};

export default ComponentsBar;
