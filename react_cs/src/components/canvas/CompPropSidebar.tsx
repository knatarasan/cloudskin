import { useState } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from "../../services/api";

const CompPropSidebar = ({ node, refreshComp }: any) => {

    const [apiObject, setApiObject] = useState(node.api_object)

    const handleChange = (e: any) => {
        apiObject[e.target.name] = e.target.value
    };

    const createInstance = (e: any) => {
        api.put(`/ec2/${apiObject.id}/create_instance`, {})
            .then((response) => {
                console.log("AWS instance created", response)
                /*
                    Can you create zutand store here and update the node object
                    instead of folowing refreshComp() method
                */
                refreshComp(apiObject.id);
            })                    
        // Once created it has to update master plan object
    }
    const refreshInstance = (e: any) => {
        refreshComp(apiObject.id)
    }
    const installAttachable = (e: any) => {
        console.log('install ', node.attachables[0].name)

        api.put("/ec2/" + `${node.api_object.id}` + "/install_service", {})
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
        console.log("AWS instance will be terminated", apiObject.id);
        api.put(`/ec2/${apiObject.id}/terminate_instance`, {})
            .then((response) => {
                console.log("AWS instance terminated", response);
                /*
                    Can you create zutand store here and update the node object
                    instead of folowing refreshComp() method
                */
                refreshComp(apiObject.id);
            })
    }



    const handleSubmit = (e: any) => {
        const end_point = apiObject.aws_component;
        console.log('update call', `/${end_point}/${apiObject.id}`, apiObject);
        api.put(`/${end_point}/${apiObject.id}`, apiObject)
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
                    <Card.Subtitle className="mb-2 text-muted"><strong>Properties of <i>{node.api_object.aws_component}</i></strong></Card.Subtitle><br />
                    {Object.keys(apiObject).map((key) =>
                        <>
                            <Card.Text>
                                <Container>
                                    <Row>
                                        <Col sm={5}>
                                            <label htmlFor={key}>{key}:</label>
                                        </Col>
                                        <Col sm={7}>
                                            <input type="text" name={key} placeholder={apiObject[key]} onChange={handleChange}></input><br />
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


            {node.attachables.length > 0 ? <Card id="node_attachable" style={{ width: '18rem' }}>
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