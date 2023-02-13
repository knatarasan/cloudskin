import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
// import { IoResizeSharp } from 'react-icons/io5';
import { useNodeSchemaStore } from '../../store/useNodeSchemaStore';


const ContainerNode = ({ data, selected }) => {
    const getNodeSchema = useNodeSchemaStore(state => state.getNodeSchema);
    const nodeSchema = getNodeSchema(data.schemaId);

    return (
        <>
            {/* <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
                <IoResizeSharp style={{ transform: 'rotate(90deg)' }} />
            </NodeResizeControl> */}

            <NodeResizer isVisible={selected} />
            <div className="m-1" >
                <div className="row">
                    <div className="d-flex align-items-center">
                        {<nodeSchema.icon size='20px' />}
                        <div className="ms-1">{data.label}</div>
                    </div>
                </div>
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />
            </div>
        </>
    );
}


export default React.memo(ContainerNode);
