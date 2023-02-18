import { useState } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from "../../services/api";
import useStore from './Store';

const selector = (state) => ({
    nodes: state.nodes,
    updateNodeColor: state.updateNodeColor,
    updateNode: state.updateNode,
});

const CompPropSidebar = ({ node_idx }: any) => {

    const { nodes, updateNodeColor, updateNode } = useStore(selector);
    const node = nodes[node_idx]        // Refer bottom of this file for node data structure
    const [api_object, setApiObject] = useState(nodes[node_idx].data.api_object);

    const handleChange = (e: any) => {
        api_object[e.target.name] = e.target.value
    };

    const createInstance = (e: any) => {
        api.put(`/ec2/${api_object.id}/create_instance`, {})
            .then((response) => {
                console.log("AWS instance created", response)
                updateNode(api_object.id, response.data) // update nodes in zustand store 
            })
    }

    const refreshInstance = (e: any) => {
        console.log("Node data will be refreshed", api_object.id);

        api.get(`/ec2/${api_object.id}/update_instance_details`)
            .then((response) => {
                updateNode(api_object.id, response.data)
            })
            .then(() => {
                console.log("Node data refreshed")
                console.log('nodes', nodes)
            })
            .catch((error) => {
                console.log('Node data refresh failed ', error);
            })

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
        console.log("AWS instance will be terminated", api_object.id);
        api.put(`/ec2/${api_object.id}/terminate_instance`, {})
            .then((response) => {
                console.log("AWS instance terminated", response);
                updateNode(api_object.id, response.data)         // update nodes in zustand store TODO testing
            })
    }


    const handleSubmit = (e: any) => {
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
            <Card id="node_props" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"><strong>Properties of <i>{api_object.aws_component}</i></strong></Card.Subtitle><br />
                    {Object.keys(api_object).map((key) =>
                        <>
                            <Card.Text>
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
                            </Card.Text>
                        </>
                    )}
                    <Button variant="outline-success" type="submit" onClick={handleSubmit}>Save</Button>
                    <Button variant="outline-success" type="submit" onClick={createInstance}>Deploy</Button>
                    <Button variant="outline-success" type="submit" onClick={refreshInstance}>Refresh</Button>
                    <Button variant="outline-success" type="submit" onClick={terminateInstance}>Terminate</Button>
                </Card.Body>
            </Card>


            {node.data.attachables.length > 0 ? <Card id="node_attachable" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"><strong>Properties of <i>{node.attachables[0].name}</i></strong></Card.Subtitle><br />
                    {node.attachables.map((attachable) =>
                        <>
                            <Card.Text>
                                <Container>
                                    <Row>
                                        <Col sm={5}>
                                            <label htmlFor={attachable.id}>{attachable.id}:</label>
                                        </Col>
                                        <Col sm={7}>
                                            <input type="text" name={attachable.name} placeholder={attachable.name} onChange={handleChange}></input><br />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Text>
                        </>
                    )}

                    <Button variant="outline-success" type="submit" onClick={installAttachable}>Install</Button>
                    <Button variant="outline-success" type="submit" onClick={unInstallAttachable}>Uninstall</Button>
                </Card.Body>
            </Card>
                : null}

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