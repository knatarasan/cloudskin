import React, { useRef, useCallback, useEffect, useContext, useState as useStateVan } from "react";
// import useState from 'react-usestateref';
import useState from 'react-usestateref';


import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  ReactFlowInstance,
  OnConnect,
  Position,

} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";
import "./CloudCanvas.css";
import { UserContext } from "../../context/Context";
import { useParams } from 'react-router-dom';
import { api_host } from "../../env/global";
import { authAxios } from "../auth/AuthServiceAxios";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import CompPropSidebar from "./CompPropSidebar";
// import { serialize, deserialize } from "react-serialize";
// import ec2icon  from './Arch_Amazon-EC2_32.png'
import AWSComponent from "../aws/AWSComponent";
import AWSCompNode from "./AWSCompNode";

const nodeTypes = {
  awsCompNode: AWSCompNode,
};


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { plan_id_edit } = useParams()
  const [planId, setPlanId, planIdRef] = useState<number>(-1);   // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  const [plan, setPlan, planRef] = useState<any>({});
  const [reactFlowInstance, setReactFlowInstance, reactFlowInstanceRef] = useState<ReactFlowInstance>()

  const [clickedNode, setClickedNode] = useStateVan({})
  const planCreatedRef = useRef(false);                         // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)
  // Ref : https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react#:~:text=This%20is%20because%20outside%20of,your%20hook%20has%20been%20ran.
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [save_update, setSaveUpdate] = useStateVan(true);



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

      // console.log('reactFLowinstance', reactFlowInstanceRef.current)
      // console.log('flow', flow)
      const plan_wrapper = {
        plan: flow,
        deploy_status: 1,
        running_status: 1,
      };

      authAxios.put("/plan/" + `${planIdRef.current}`, plan_wrapper)
        .then((response) => {
          console.log("Plan successfully updated", response.data.id)
        })
        .catch((error) => {
          console.log("Plan not updated", error)
        })
    }

  }

  useEffect(() => {

    // componentDidMount
    authAxios.get("/plan/" + `${plan_id_edit}`)
      .then((response) => {
        setPlanId(Number(plan_id_edit))
        setPlan(response.data)
        planCreatedRef.current = true;
        if (Number(plan_id_edit)) {
          setSaveUpdate(false)
        }
        const flow = response.data.plan
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
        }


        console.log("Plan successfully retrieved", response.data.id)
      })
      .catch((error) => {
        console.log(plan_id_edit, ' is not right plan id to edit', error);
      })
    // componentDidMount

    // componentWillUnMount
    return () => {
      console.log('comp did unmount here', reactFlowInstance, reactFlowInstanceRef);
      onSave() // BUG this save doesn't work since reactFlowInstance got lost before save function called

    }
    // componentWillUnMount
  }, [])


  const onConnect = useCallback<OnConnect>(
    (params: Edge | Connection): void => setEdges((eds) => {

      console.log('on connect param', params);
      console.log('TODO add connectivity between ', params.source, ' to ', params.target)

      return addEdge(params, eds)
    }
    ),
    [setEdges]
  );

  const onEdgesDelete = useCallback<any>(
    (params: Edge[]): void => {
      console.log('Edges deleted', params)
    }, []
  );

  const onNodeDelete = (nodes: any): void => {
    // console.log('This node will be deleted ', nodes);

    nodes.map((node: any) => {
      const endpoint = node.data.api_object.aws_component;

      authAxios.delete(`/${endpoint}/${node.data.api_object.id}`)
        // .then((response) => {
        //   // console.log("AWS component has been deleted")
        // })
        .catch((error) => {
          console.log("AWS component not deleted", error)
        })
    })

  }

  const deployPlan = () => {
    const plan_clone = structuredClone(planRef.current)
    plan_clone.deploy_status = 2
    console.log('plan_clone', plan_clone)
    authAxios.put("/plan/" + `${planIdRef.current}`, plan_clone)
      .then((response) => {
        console.log("Plan deployment activated", response.data)
        setPlan(response.data)
        // plan.deploy_status = 2
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
    // console.log("AWS Comp create called ", comp, plan_id)
    const aws_component = {
      "plan": planIdRef.current
    }

    return await authAxios.post(`/${name}/`, aws_component)
      .then((response) => {
        // console.log("AWS Comp created", response.data)
        return response.data
      })
      .catch((error) => {
        console.log("AWS Comp not created", error.response.status)
      })
  }

  const createNewNode = (name: string, size: number, color: string, event: React.DragEvent<HTMLDivElement>): void => {
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) || { x: 0, y: 0 }

    // TO USE SVG check this https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs

    // let comp = serialize(<svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>)    // let comp_ser = serialize(comp)
    let comp: any = null
    // console.log('serialized comp', comp)
    // console.log('deserialized comp', deserialize(comp))


    // if (name === "ec2") {
    //   // comp = <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
    //   comp = <AWSComponent comp="ec2" />
    //   // comp = "EC2"
    // } else if (name === "lb") {
    //   // comp = <LoadBalancerIcon size={size} />;
    //   // comp = <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Elastic-Load-Balancing_32_svg__a"><stop stop-color="#4D27A8" offset="0%"></stop><stop stop-color="#A166FF" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Elastic-Load-Balancing_32_svg__a)"></path><path d="M15 27c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7m14 1c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0-20c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m1 10.5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M22.931 21h4.12A2.997 2.997 0 0030 23.5c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.997 2.997 0 00-2.949 2.5H23c0-1.489-.416-2.88-1.128-4.075l4.827-4.023A2.982 2.982 0 0029 13c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .361.074.702.191 1.022l-4.885 4.072A7.985 7.985 0 0015 12c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.985 7.985 0 006.306-3.094l4.885 4.072c-.117.32-.191.661-.191 1.022 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.929 0-1.75.433-2.301 1.098l-4.827-4.023A7.927 7.927 0 0022.931 21" fill="#FFF"></path></g></svg>
    //   comp = <AWSComponent comp="lb" />
    //   // comp = "LB"
    // }

    createAWSComponent(name)
      .then((awsComp) => {
        const new_node: Node<any> = {
          id: awsComp.id.toString(),
          type: 'awsCompNode',
          position,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          // style: { border: "100px", width: "5%", background: color },
          style: { border: "100px", width: "5%" },

          // data: { label: name+' '+awsComp.id.toString(), api_object: awsComp },
          data: { label: awsComp.id.toString(), api_object: awsComp, color: 'red' },
        };
        console.log('new_node ', new_node)
        setNodes((nds) => nds.concat(new_node));
      })
  };

  const onNodeClick = (event: any, node: any) => {
    setClickedNode({})
    setClickedNode(node.data)
    // console.log('clickedNode ', clickedNode)
  }

  const onPaneClick = (event: any) => {
    setClickedNode({})
  }

  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      
      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))

      // dropped node is attachable type 
      if (data.nodeType ==='attachable'){
        const reactFlowBounds :any = reactFlowWrapper.current?.getBoundingClientRect();
        let centerX =0
        let centerY =0
        const pos:any = reactFlowInstance?.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        centerX = pos.x;
        centerY = pos.y;
         
        const targetNode = reactFlowInstanceRef.current?.getNodes().find(
          (n:any) =>
            centerX > n.position.x &&
            centerX < n.position.x + n.width &&
            centerY > n.position.y &&
            centerY < n.position.y + n.height 
            // n.id !== node.id // this is needed, otherwise we would always find the dragged node
        );
    
        // setTarget(targetNode);
        console.log('node found ',targetNode)
        return

      }
      // dropped node is attachable type 


      if (planIdRef.current && planCreatedRef.current) {
        console.log('To augment existing plan ', planIdRef)
        createNewNode(data.node, 25, "red", event)
      } else {
        planCreatedRef.current = true;        // This ref boolean value is used to avoid calling createPlan twice ( in Development useEffect called twice)

        //create plan
        const plan_obj = {
          plan: {},
          deploy_status: 1,
          running_status: 1,
        };

        authAxios.post("/plan/", plan_obj)
          .then((response) => {
            const new_plan_id = Number(response.data.id)
            setPlanId(new_plan_id)
            setPlan(response.data)
            setSaveUpdate(false)
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
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodesDelete={onNodeDelete}
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
              <button id='save_update' onClick={onSave}> Save Plan</button>(This button is only for testing)<br/>
              <button onClick={deployPlan}>Deploy Plan</button>
              <h1>{planRef.current.deploy_status}</h1> <h5>There is a bug in save plan & deploy plan cycle</h5>
              <p>Plan id : {planId} is plan exist: {planCreatedRef.current}</p>

              {"label" in clickedNode ? <CompPropSidebar node={clickedNode} /> : null}
            </div>
            <div>
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
