import React, { useRef, useCallback, useEffect } from "react";
import useState from 'react-usestateref';
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

import Sidebar from "./Sidebar";
import CompPropSidebar from "./CompPropSidebar";
import AWSCompNode from "../aws/AWSCompNode";
import PlanService from "../../services/plan.service";
import api from "../../services/api";
import { useStore } from "../../store/Store";
import CanvasNavbar from "../navbar/CanvasNavbar";

import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  Controls,
  Position,
} from "reactflow";

import "./CloudCanvas.css";
import "reactflow/dist/style.css";

import { shallow } from "zustand/shallow";

const nodeTypes = {
  awsCompNode: AWSCompNode,
};

const selector = (state) => ({
  addPlan: state.addPlan,
  updateNodeColor: state.updateNodeColor,
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeNode: state.removeNode,
  emptyContext: state.emptyContext
});

const DnDFlow = () => {
  // Opening existing plan
  const { plan_id_edit } = useParams()
  // to Refer PlanId
  const [planId, setPlanId, planIdRef] = useState<number>(-1);   // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  // to Refer Plan object
  const [plan, setPlan, planRef] = useState<any>({});
  const [reactFlowInstance, setReactFlowInstance, reactFlowInstanceRef] = useState<any>()
  const [clickedNode, setClickedNode, clickedNodeRef] = useState<number>(-1)
  // const planCreatedRef = useRef(false);                         // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)
  // Ref : https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react#:~:text=This%20is%20because%20outside%20of,your%20hook%20has%20been%20ran.
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addPlan, emptyContext, removeNode } = useStore(selector, shallow);
  const deleteKeyCodes = React.useMemo(() => ['Backspace', 'Delete'], []);


  const onSave = () => {

    console.log("in onSave", reactFlowInstance, reactFlowInstanceRef, planIdRef.current)
    if (reactFlowInstanceRef.current) {
      // update plan
      const flow = reactFlowInstanceRef.current.toObject();

      flow.nodes.map((node) => {
        if (node.data.label.props) {
          node.data.label = node.data.label.props.comp
        }
      })

      const plan_wrapper = {
        plan: flow,
        deploy_status: 1,
        running_status: 1,
      };


      api.put(`/plan/${planIdRef.current}/`, plan_wrapper)
        .then((response) => {
          console.log("Plan successfully updated", response.data.plan_id)
        })
        .catch((error) => {
          console.log("Plan not updated", error)
        })
    }
  }

  const refreshPlan = (plan_id_edit) => {

    // api.get(`/plan/${plan_id_edit}/`)
    //   .then((response) => {
    //     addPlan(response.data)

    //     console.log("Plan successfully retrieved", response.data.plan_id)
    //   })
    //   .catch((error) => {
    //     console.log(plan_id_edit, ' is not right plan id to edit', error);
    //   })
  }

  useEffect(() => {

    // componentDidMount
    api.get(`/plan/${plan_id_edit}/`)
      .then((response) => {
        setPlanId(Number(plan_id_edit))
        setPlan(response.data)
        addPlan(response.data)

        const flow = response.data.plan
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
        }

        // Create Parent node

        console.log("Plan successfully retrieved", response.data.plan_id)
      })
      .catch((error) => {
        console.log(plan_id_edit, ' is not right plan id to edit', error);
      })
    // componentDidMount

    // componentWillUnMount
    return () => {
      console.log('comp did unmount here', reactFlowInstance, reactFlowInstanceRef);
      onSave()
      emptyContext()
    }
    // componentWillUnMount
  }, [])


  const onEdgesDelete = useCallback<any>(
    (params: Edge[]): void => {
      console.log('Edges deleted', params)
    }, []
  );

  // const onNodeDelete = useCallback((deleted) => {
  //   // nodes.map((node) => {
  //   //   if (node.data.api_object.ec2_status === -1) {
  //   //     removeNode(node.id)
  //   //   }
  //   // })

  //   setClickedNode(-1);
  //   const flow = reactFlowInstanceRef.current.toObject();
  //   // onSave();

  // },
  //   [nodes, edges]
  // );

  // const onNodeDelete = (nodes: any): void => {
  //   console.log('This node will be deleted ', nodes);
  //   /*
  //     - if is there an active instance attached to it
  //       - delete
  //     - else 
  //       - dont delte , but alert
  //   */

  // nodes.map((node) => {
  //   if (node.data.api_object.ec2_status === -1) {
  //     removeNode(node.id)
  //   }
  // })

  // setClickedNode(-1);
  // const flow = reactFlowInstanceRef.current.toObject();
  // onSave();
  // }
  const deletePlan = () => {
    PlanService.deletePlan(planIdRef.current.toString())
      .then((response) => {
        console.log("Plan has been deleted  ", planIdRef.current.toString())
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log("Plan not deleted", error)
      })
  }

  const deployPlan = () => {
    const plan_clone = structuredClone(planRef.current)
    plan_clone.deploy_status = 2
    console.log('plan_clone', plan_clone)
    api.put(`/plan/${planIdRef.current}/`, plan_clone)
      .then((response) => {
        console.log("Plan deployment activated", response.data)
        setPlan(response.data)
      })
      .catch((error) => {
        console.log("Plan deployment activation failed", error)
      })
  }

  const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const createAWSComponent = async (name: string) => {
    const aws_component = {
      "plan": planIdRef.current
    }

    return await api.post(`/${name}/`, aws_component)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log("AWS Comp not created", error.response.status)
      })
  }

  const createNetwork = (): void => {
    const region_node = {
      id: 'reg',
      data: { label: 'region' },
      position: { x: 100, y: 100 },
      className: 'light',
      style: { width: 400, height: 400, borderColor: 'blue' },
      deletable: false,
    }

    setNodes(region_node);

    const vpc_node = {
      id: 'vpc',
      data: { label: 'vpc' },
      position: { x: 25, y: 35 },
      className: 'light',
      style: { width: 350, height: 350, borderColor: 'green' },
      extent: 'parent',
      parentNode: 'reg',
      deletable: false,
    }

    setNodes(vpc_node);

    const subnet_node = {
      id: 'snt',
      data: { label: 'public subnet' },
      position: { x: 25, y: 35 },
      className: 'light',
      style: { width: 300, height: 300, backgroundColor: '#e6ffe6', borderColor: 'white' },
      extent: 'parent',
      parentNode: 'vpc',
      deletable: false,
    }

    setNodes(subnet_node);

    const sg_node = {
      id: 'sgr',
      data: { label: 'security group' },
      position: { x: 25, y: 35 },
      className: 'light',
      style: { width: 250, height: 250, borderColor: '#cc5200' },
      extent: 'parent',
      parentNode: 'snt',
      deletable: false,
    }

    setNodes(sg_node);
  }



  const createNewNode = (name: string, size: number, color: string, event: React.DragEvent<HTMLDivElement>): void => {
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) || { x: 0, y: 0 }

    // TO USE SVG check this https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs

    createAWSComponent(name)
      .then((awsComp) => {

        createNetwork();
        const new_node: Node<any> = {
          id: awsComp.id.toString(),
          type: 'awsCompNode',
          position: { x: 25, y: 35 },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: { height: "50px", width: "50px" },
          data: { label: awsComp.id.toString(), attachable: '', attachables: [], api_object: awsComp, color: 'red' },
          parentNode: 'sgr',
          extent: 'parent',
          deletable: true

        };
        console.log('new_node ', new_node)
        setNodes(new_node);
      })
    console.log('nodes ', nodes['arg1'])
  };


  const onNodeClick = (event: any, node: any) => {
    console.log('onNodeClick ', node)
    //  Node click should only be applied for regular nodes
    if (node.id.substring(0, 3) !== 'vpc' && node.id.substring(0, 3) !== 'sgr' && node.id.substring(0, 3) !== 'snt' && node.id.substring(0, 3) !== 'reg') {
      nodes.map((node_i, idx) => {
        if (node_i.id === node.id) {
          setClickedNode(idx);
        }
      })
    }

  }

  const onPaneClick = (event: any) => {
    setClickedNode(-1)
  }

  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))

      if (planIdRef.current != -1) {    // As initialized , when plan is not available
        console.log('To augment existing plan ', planIdRef)
        createNewNode(data.node, 25, "red", event)
      } else {
        // create plan

        const plan_obj = {
          plan: {},
          deploy_status: 1,
          running_status: 1,
        };

        api.post("/plan/", plan_obj)
          .then((response) => {
            const new_plan_id = Number(response.data.plan_id)
            setPlanId(new_plan_id)
            setPlan(response.data)
            addPlan(response.data)
            console.log("plan created", planIdRef.current)
          }).then(() => {
            createNewNode(data.node, 25, "red", event)
          })
          .catch((error) => {
            console.log("Plan not saved", error.response.status)
          })
        //create plan 
      }
    },
    [reactFlowInstance]);


  return (
    <>
      <CanvasNavbar onSave={onSave} deployPlan={deployPlan} deletePlan={deletePlan} />
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <div className="reactflow-wrapper" ref={reactFlowWrapper} data-testid="work-canvas">
            <p>Plan id : {planId} </p>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              deleteKeyCode={deleteKeyCodes}
              onNodesChange={onNodesChange}
              // onNodesDelete={onNodeDelete}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgesDelete={onEdgesDelete}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <div className="save__controls">

                {clickedNode > -1 ? <CompPropSidebar node_idx={clickedNode} refreshPlan={refreshPlan} plan_id_edit={plan_id_edit} /> : null}
              </div>
              <div>
              </div>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;
