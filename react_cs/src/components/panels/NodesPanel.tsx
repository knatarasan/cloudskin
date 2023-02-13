import React from 'react';
import { Link } from 'react-router-dom';
import { useNodeSchemaStore } from '../../store/useNodeSchemaStore';


const NodesPanel = () => {
  const nodeSchemas = useNodeSchemaStore(state => state.nodeSchemas);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, key: string) => {
    event.dataTransfer.setData('application/node', key);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>
      <div className="description">PALETTE</div>
      <div className="d-flex flex-row">
        {
          nodeSchemas.map((item) => (
            <div key={item.schemaId}
              className="m-2"
              onDragStart={(event) => onDragStart(event, item.schemaId)}
              draggable
            >
              <item.icon size={35} />
            </div>
          ))
        }
      </div>
    </aside>
  );
};

export default NodesPanel;
