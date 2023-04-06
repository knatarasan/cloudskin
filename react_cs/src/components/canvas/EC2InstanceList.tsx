import React from 'react';
import {Container, Row, Col}   from 'react-bootstrap';

import { useStore } from './Store';

const EC2InstanceList = ({ curr_selection }: any) => {
    console.log("key", curr_selection)
    const addUser = useStore(state => state.addUser)
    const ec2_instance_types = useStore(state => state.ec2_instance_types)

    return (
        <Container>
            <Row>
                <Col sm={5}>
                    <label htmlFor={'instance_type'}>{'instance_type'}:</label>
                </Col>
                <Col sm={7}>
                    {/* <input type="text" name={key} placeholder={api_object[key]} onChange={handleChange}></input><br /> */}
                     {curr_selection}
                </Col>
            </Row>
        </Container>



    )
}

export default EC2InstanceList;