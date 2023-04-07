import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useStore } from './Store';


const selector = (state) => ({
    nodes: state.nodes,
    ec2_instance_types: state.ec2_instance_types,
});



const EC2InstanceList = ({ curr_selection, node_idx }: any) => {

    const { nodes,  ec2_instance_types  } = useStore(selector);
    const addUser = useStore(state => state.addUser)
    const api_object = nodes[node_idx].data.api_object

    const handleChange = (e: any) => {
        api_object[e.target.name] = e.target.value
        // consider following logic, when you encouter issues in above setting
        // setApiObject({ ...api_object, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Row>

                <Col sm={5}>
                    <label htmlFor='instance_type'>instance_type:</label>
                </Col>
                <Col sm={7}>
                    <select name="instance_type" onChange={handleChange}>
                        {ec2_instance_types['us-east-1']?.map((item: any) => (
                            <option key={item.id} value={item.instance_type} selected={item.instance_type === curr_selection}>
                                {item.instance_type}
                            </option>
                        ))}
                    </select>

                </Col>
            </Row>
        </Container>
    );



}

export default EC2InstanceList;