import { memo } from 'react';
import {
    ReactFlowProvider,
} from 'reactflow';
import FlowCanvas from "./components/canvas/FlowCanvas";
import NodesPanel from './components/panels/NodesPanel';
import Stack from 'react-bootstrap/Stack';

const mainStyle = {
    flexGrow: 1,
    // flexDirection: FlexDirection.column,
    display: 'flex',
    height: '100%',
};

export const Main = memo(() => {
    return (
        <div className='dndflow'>
            <NodesPanel />

            <ReactFlowProvider>
                <FlowCanvas />
            </ReactFlowProvider>

        </div>
    );
});

