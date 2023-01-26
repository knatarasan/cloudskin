import { useState } from "react"
import { authAxios } from "../auth/AuthServiceAxios";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CompPropSidebar = ({ node }: any) => {
    const [apiObject, setApiObject] = useState(node.api_object)

    const handleChange = (e: any) => {
        apiObject[e.target.name] = e.target.value
    };

    const handleSubmit = (e: any) => {
        const end_point = apiObject.aws_component;
        console.log('update call', `/${end_point}/${apiObject.id}`, apiObject);
        authAxios.put(`/${end_point}/${apiObject.id}`, apiObject)
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
                    <Card.Subtitle className="mb-2 text-muted"><strong>Properties of {node.label}</strong></Card.Subtitle><br />
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
                    <Button variant="outline-success" type="submit" onClick={handleSubmit}>Save {node.label}</Button>
                </Card.Body>
            </Card>

        </>
    )
}

export default CompPropSidebar