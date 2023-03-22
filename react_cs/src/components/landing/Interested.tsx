import React from "react";
import { Col, Row, Nav, Navbar, Button, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import '../../App.css'

// display: block;
// width: 25%;
// background-color: #FFFFFF;
// color: #491619;
// border: 2px solid black;
// padding: 10px;
// border-radius: 5px;

const Interested = () => {
    return (
        <div>
            <style type="text/css">
                {`
    .get-started {
        display: block;
        width: 25%;
        background-color: #FFFFFF;
        color: #491619;
        border: 2px solid black;
        padding: 10px;
        border-radius: 5px;
      }
                `}
            </style>

            <h1>Interested?</h1>
            <br />
            <Container>
                <Row>
                    <Col>
                        <label>Name</label>
                        <input placeholder="Full Name" id="name"></input>
                    </Col>
                    <Col>
                        <label>Email</label>
                        <input id="email" placeholder="Email"></input>
                    </Col>
                    <Col>
                        <label>I am</label>
                        <input id="Iam" placeholder="I am"></input>
                    </Col>
                    <Button className="get-started">Get the Latest Updates</Button>

                </Row>
            </Container>

        </div>
    )
}

export default Interested;