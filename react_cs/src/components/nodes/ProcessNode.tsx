
import { Handle, Position } from 'reactflow';
import React from 'react';
import { useNodeSchemaStore } from '../../store/useNodeSchemaStore';


const ProcessNode = ({ data }) => {
    const getNodeSchema = useNodeSchemaStore(state => state.getNodeSchema);
    const nodeSchema = getNodeSchema(data.schemaId);

    return (
        <div className="m-1">
            <div className="row">
                <div className="d-flex align-items-center">
                    {<nodeSchema.icon size='20px' />}
                    <div className="ms-1">{data.label}</div>
                </div>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}


export default React.memo(ProcessNode);
