import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
    Node,
    Controls,
    NodeMouseHandler,
    OnNodesDelete,
    useReactFlow,
} from 'reactflow';
import * as t from "typed-assert";
import ProcessNode from '../nodes/ProcessNode';
import ContainerNode from '../nodes/ContainerNode';
import { useNodeSchemaStore } from '../../store/useNodeSchemaStore';
import { useNodeStore } from '../../store/useNodeStore';
import { nanoid } from 'nanoid';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PlanService from '../../services/plan.service';
import { NodeData } from '../../models/NodeTypes';
// import CompPropSidebar from './CompPropSidebar';

const flowStyle = {
    // flexGrow: 1,
    height: "100%"
};

const nodeTypes = {
    'container': ContainerNode,
    'process': ProcessNode,
};

const FlowCanvas = () => {
    const flowWrapper = useRef<HTMLDivElement>(null);

    const { nodes, edges } = useNodeStore();

    const reactFlowInstance = useReactFlow();

    const getNodeSchema = useNodeSchemaStore(state => state.getNodeSchema);

    const addNode = useNodeStore((s) => s.addNode);
    const removeNodes = useNodeStore((s) => s.removeNodes);
    const onNodesChange = useNodeStore(state => state.onNodesChange);
    const resetNodes = useNodeStore((s) => s.resetNodes);
    const resetEdges = useNodeStore((s) => s.resetEdges);

    const [showNodeProperties, setShowNodeProperties] = useState<[Boolean, Node<NodeData> | null]>([false, null]);

    const { planNo } = useParams();
    // TODO Change to useStateRef
    const [currentPlanNo, setCurrentPlanNo] = useState<string>()

    useEffect(() => {
        setCurrentPlanNo(planNo);

        if (planNo) {
            PlanService.getPlan(planNo).then((response) => {
                console.log('Get Plan', response);
                const flow = response.data.plan;
                if (flow) {
                    console.log(flow.viewport);
                    const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                    resetNodes(flow.nodes || []);
                    resetEdges(flow.edges || []);
                    reactFlowInstance.setViewport({ x, y, zoom });
                }
            }).catch((error) => { console.log(error) });
        }
    }, [planNo]);

    const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }, []
    );

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (!flowWrapper || !flowWrapper.current) return;

            const schemaId = event.dataTransfer.getData('application/node');

            const { top, left } = flowWrapper.current.getBoundingClientRect() || new DOMRect();

            // we need to remove the wrapper bounds, in order to get the correct mouse position
            const position = reactFlowInstance.project({
                x: event.clientX - left,
                y: event.clientY - top,
            }) || { x: 10, y: 10 };

            const component = getNodeSchema(schemaId);
            t.isNotUndefined(component);
            console.log('Create New Node', schemaId, component, position);

            const nodeId = nanoid();
            addNode({
                id: nodeId,
                type: component.nodeType,
                position,
                // selected: true,
                // TODO - Move this inside the CustomNode definition
                style: { border: '0.5px solid grey', borderRadius: 10, fontSize: 8 },
                data: { id: nodeId, schemaId: schemaId, label: component.name, properties: '' },
            });
        },
        [reactFlowInstance, flowWrapper]
    );

    const onNodeClick = useCallback<NodeMouseHandler>(
        (event, node) => {
            console.log('onNodeClick', node);
            setShowNodeProperties([true, node]);
        }, []
    );

    const onPaneClick = (event: React.MouseEvent) => {
        console.log('onPaneClick ', nodes)
        setShowNodeProperties([false, null]);
    }

    const onNodesDelete = useCallback<OnNodesDelete>(
        nodes => {
            console.log('onNodesDelete', nodes);
            removeNodes(nodes);
        }, []
    );

    const onSave = () => {
        console.log("onSave Clicked");
        const flow = reactFlowInstance.toObject();

        if (currentPlanNo)
            PlanService.updatePlan(currentPlanNo, flow, 1, 1)
                .then((response) => {
                    console.log('Plan updated', response, flow);
                })
                .catch((error) => { console.log(error) });
        else
            PlanService.createPlan(flow)
                .then((response) => {
                    console.log('Create Plan No', response.data.plan_no, flow);
                    // TODO: change this to plan_no after fixing in all places
                    setCurrentPlanNo(response.data.plan_id);
                })
                .catch((error) => { console.log(error) });
    }

    const onDeploy = useCallback(() => {
        console.log('Deploy Plan No: ', currentPlanNo);
        if (currentPlanNo) {
            console.log('Plan deployed');
        }
    }, [currentPlanNo]);

    return (
        <div className='container-fluid'>
            <div className="d-flex flex-row justify-content-end align-items-center">
                <Button className="ms-1" variant="outline-primary" size="sm" onClick={onSave}>Save</Button>
                <Button className="ms-1" variant="outline-primary" size="sm" onClick={onDeploy}>Deploy</Button>
            </div>
            <div style={flowStyle} ref={flowWrapper}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    deleteKeyCode={useMemo(() => ['Backspace', 'Delete'], [])}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodesDelete={onNodesDelete}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    onNodesChange={onNodesChange}
                    fitView
                >
                    <Controls showInteractive={false} />

                    {/* {showNodeProperties[0] && <CompPropSidebar node={showNodeProperties[1]} />} */}

                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowCanvas;