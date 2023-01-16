import { Container, Navbar, Nav, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../static/images/logo3.png";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React, { useState } from "react";
import { authAxios } from "../auth/AuthServiceAxios";

const IAMUser = () => {
    const [aws_key, setAWSKey] = useState("");
  const [aws_secret, setAWSSecret] = useState("");
  
  const login = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    authAxios.post("/aws_creds/", { aws_key: aws_key, aws_secret: aws_secret })
      .then((response: { status: number; data: { access: any }; }) => {
        console.log('response from axios ', response)

        const accessToken = response.data.access
        localStorage.setItem("accessToken", accessToken);
        // TODO : After successful login accessToken can be stored in React Context
        
      })
      .catch(e => {
        console.log('Check your request ', e, e.response.status)
      });

  };

    const codeString = '{\n' +
        '   "Version": "2012-10-17",\n' +
        '   "Statement": [\n' +
        '   {\n' +
        '            "Effect": "Allow",\n' +
        '             "Action": [\n' +
        '                "ec2:RunInstances",\n' +
        '                "ec2:TerminateInstances",\n' +
        '                "ec2:StartInstances",\n' +
        '                "ec2:StopInstances"\n' +
        '            ],\n' +
        '            "Resource": "*"\n' +
        '        },\n' +
        '        {\n' +
        '            "Effect": "Allow",\n' +
        '            "Action": [\n' +
        '                "ec2:CreateTags",\n' +
        '                "ec2:DescribeInstances",\n' +
        '                "ec2:DescribeInstanceStatus",\n' +
        '                "ec2:DescribeAddresses",\n' +
        '                "ec2:AssociateAddress",\n' +
        '                "ec2:DisassociateAddress",\n' +
        '                "ec2:DescribeRegions",\n' +
        '               "ec2:DescribeAvailabilityZones"\n' +
        '                ],\n' +
        '            "Resource": "*"\n' +
        '        }\n' +
        '    ]\n' +
        '}'
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={logo} width={50} height={"auto"}></img>
                        </Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Container>
                <Row>
                    <Col>
                        <div>
                            <ol>
                                <li><a href="">Click here to create an IAM user in AWS</a>

                                </li>
                                <li>Add a Policy to your IAM user <br />

                                    <SyntaxHighlighter language="javascript" style={docco}>
                                        {codeString}
                                    </SyntaxHighlighter>
                                </li>
                                <li>
                                    Enter AWS credentials <br/>
                                    <div>
                                        <Container>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form onSubmit={login}>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>AWS_ACCESS_KEY</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="aws_access_key"
                                                                name="aws_key"
                                                                value={aws_key}
                                                                onChange={(e) => setAWSKey(e.target.value)}
                                                            />
                                                            <Form.Text className="text-muted">
                                                                We'll never share your email with anyone else.
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>AWS_SECRET_ACCESS_KEY</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="aws_secret_access_key"
                                                                name="aws_secret"
                                                                onChange={(e) => setAWSSecret(e.target.value)}
                                                            />
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit">
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                </li>
                                <br />
                            </ol>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default IAMUser

/*
                                    Insert your AWS credentials here:<br />
                                    <label>Access Key: </label>
                                    <input type="text"></input><br />
                                    <label>Secret Access Key: </label>
                                    <input type="text"></input>
*/