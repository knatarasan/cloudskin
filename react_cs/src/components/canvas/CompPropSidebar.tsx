import { useEffect } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from "../../services/api";
import EC2InstanceList from "../aws/EC2InstanceList";
import { useStore } from '../../store/Store';

const selector = (state) => ({
    nodes: state.nodes,
    plan: state.plan,
    updateNodeColor: state.updateNodeColor,
    updateNode: state.updateNode,
    setEc2_instance_types: state.setEc2_instance_types,
    ec2_instance_types: state.ec2_instance_types,
    updateEc2_instance_types: state.updateEc2_instance_types,
    updateNodeLabel: state.updateNodeLabel,
    updateNodeDeletable: state.updateNodeDeletable,
    addPlan: state.addPlan,
});

const CompPropSidebar = ({ node_idx, refreshPlan, plan_id_edit }) => {

    const { nodes, plan, updateNode, updateEc2_instance_types, updateNodeLabel, updateNodeDeletable, addPlan } = useStore(selector);
    useEffect(() => {
        console.log('api_object', api_object)
        // make api call to get instance types
        api.get(`/ec2_meta_basics/`)
            .then((response) => {
                updateEc2_instance_types('us-east-1', response.data)
            });

    }, [])

    let node, api_object;
    try {
        node = nodes[node_idx]        // Refer bottom of this file for node data structure
        api_object = nodes[node_idx].data.api_object
    } catch {
        return null
    }


    const handleChange = (e: any) => {
        api_object[e.target.name] = e.target.value
        // consider following logic, when you encouter issues in above setting
        // setApiObject({ ...api_object, [e.target.name]: e.target.value });
    };



    const createInstance = (e: any) => {
        const end_point = api_object.aws_component;
        api.put(`/${end_point}/${api_object.id}/create_instance`, {})
            .then((response) => {
                console.log("AWS instance created", response)
                updateNode(api_object.id, response.data) // update nodes in zustand store 
                updateNodeDeletable(api_object.id, false)
            }).catch(
                (error) => {
                    console.log("AWS instance not created", error)
                }
            );

        console.log("AWS instance will be created", api_object.id);
    }

    const refreshInstance = (e: any) => {
        const end_point = api_object.aws_component;

        console.log("Node data will be refreshed", api_object.id);

        // This should update vpc , subnet and security group

        api.get(`/${end_point}/${api_object.id}/update_instance_details`)
            .then((response) => {
                updateNode(api_object.id, response.data);

                api.get(`/plan/${plan.plan_id}/`)
                    .then((response) => {
                        addPlan(response.data);
                        updateNodeLabel('reg', 'region: us-east-1');
                        updateNodeLabel('vpc', 'vpc: ' + response.data.vpc[0].vpc_id);
                        updateNodeLabel('snt', 'snt: ' + response.data.vpc[0].subnet[0].subnet_id);
                        updateNodeLabel('sgr', 'sgr: ' + response.data.vpc[0].security_group[0].group_id);
                        console.log("Plan successfully retrieved", response.data.plan_id)
                    })
                    .catch((error) => {
                        console.log(plan_id_edit, ' is not right plan id to edit', error);
                    })

            })
            // .then(() => {
            //     console.log("Node data refreshed")

            // })
            .catch((error) => {
                console.log('Node data refresh failed ', error);
            });

        // refreshPlan(plan_id_edit);


    }

    const installAttachable = (e: any) => {
        console.log('install ', node.attachables[0].name)

        api.put(`/ec2/${node.api_object.id}/install_service`, {})
            .then((response) => {
                console.log("PG created", response)
            })
    }

    const unInstallAttachable = (e: any) => {
        console.log('uninstall ', node.attachables[0].name)

        api.put(`/ec2/${node.api_object.id}/uninstall_service`, {})
            .then((response) => {
                console.log("PG unInstalled", response)
            })
    }

    const terminateInstance = (e: any) => {
        const end_point = api_object.aws_component;

        console.log("AWS instance will be terminated", api_object.id);
        api.put(`/${end_point}/${api_object.id}/terminate_instance`, {})
            .then((response) => {
                console.log("AWS instance terminated", response);
                updateNode(api_object.id, response.data)
                updateNodeDeletable(api_object.id, true)
            })
    }


    const onSave = (e: any) => {
        const end_point = api_object.aws_component;
        console.log('update call', `/${end_point}/${api_object.id}`, api_object);
        api.put(`/${end_point}/${api_object.id}`, api_object)
            .then((response) => {
                console.log("AWS Comp updated", response.data.id)
                return response.data
            })
            .catch((error) => {
                console.log("AWS Comp not created", error.response.status)
            })
    }

    return (
        <>
            <Card id="node_props" style={{ width: '18rem' }} className="app-color">
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"><strong className="app-color">Properties of <i>{api_object.aws_component}</i></strong></Card.Subtitle><br />
                    {Object.keys(api_object).map((key) =>
                        <>
                            <Card.Text>
                                {key === 'instance_type' ? <EC2InstanceList curr_selection={api_object[key]} node_idx={node_idx} /> :
                                    <Container>
                                        <Row>
                                            <Col sm={5}>
                                                <label htmlFor={key}>{key}:</label>
                                            </Col>
                                            <Col sm={7}>
                                                <input type="text" name={key} placeholder={api_object[key]} onChange={handleChange}></input><br />
                                            </Col>
                                        </Row>
                                    </Container>
                                }

                            </Card.Text>
                        </>
                    )}
                    <Button variant="outline-secondary" type="submit" onClick={onSave}>Save</Button>
                    <Button variant="outline-secondary" type="submit" onClick={createInstance}>Deploy</Button>
                    <Button variant="outline-secondary" type="submit" onClick={refreshInstance}>Refresh</Button>
                    <Button variant="outline-secondary" type="submit" onClick={terminateInstance}>Terminate</Button>
                </Card.Body>
            </Card>

        </>
    )
}

export default CompPropSidebar


const node_struct_only_for_documentation_purpose = {
    "width": 50,
    "height": 50,
    "id": "26",
    "data": {
        "color": "red",
        "label": "26",
        "api_object": {
            "id": 26,
            "plan": 19,
            "region": "us-west-1",
            "subnet": "subnet-0a6da46fb837b5a32",
            "image_id": "ami-0f5e8a042c8bfcd5e",
            "host_name": null,
            "public_ip": "56",
            "ec2_status": 1,
            "private_ip": null,
            "aws_component": "ec2",
            "instance_type": "t2.micro",
            "security_group": "sg-0f2b88c10abf752e3",
            "ec2_instance_id": null,
            "installed_service": [],
            "instance_key_pair": "cloudskin_key",
            "date_created_or_modified": "2023-02-16T21:49:14.351984Z"
        },
        "attachable": "",
        "attachables": []
    },
    "type": "awsCompNode",
    "style": {
        "width": "50px",
        "height": "50px"
    },
    "dragging": false,
    "position": {
        "x": 101.25,
        "y": 478
    },
    "selected": true,
    "sourcePosition": "right",
    "targetPosition": "left",
    "positionAbsolute": {
        "x": 101.25,
        "y": 478
    }
}