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

    const codeStringCreateUser =
        '    mac ~ % aws iam create-user --user-name cx_user \n' +
        '    { \n' +
        '        "User": { \n' +
        '            "Path": "/", \n' +
        '            "UserName": "cx_user", \n' +
        '            "UserId": "AIDAU3XNRECYRMX00XXXX", \n' +
        '            "Arn": "arn:aws:iam::334431854769:user/cx_user", \n' +
        '            "CreateDate": "2023-01-16T18:22:47+00:00" \n' +
        '        } \n' +
        '    } \n'

    const codeStringCreatePolicy =
        'mac ~ % aws iam create-policy --policy-name cx_policy --policy-document file://cx_policy.json, \n' +
        '    { \n' +
        '       "Policy": { \n' +
        '            "PolicyName": "cx_policy", \n' +
        '            "PolicyId": "ANPAU3XNRECYZ5X00XXXX", \n' +
        '            "Arn": "arn:aws:iam::334439999999:policy/cx_policy", \n' +
        '            "Path": "/",\n' +
        '            "DefaultVersionId": "v1",\n' +
        '            "AttachmentCount": 0,\n' +
        '            "PermissionsBoundaryUsageCount": 0,\n' +
        '            "IsAttachable": true,\n' +
        '            "CreateDate": "2023-01-16T18:28:38+00:00",\n' +
        '            "UpdateDate": "2023-01-16T18:28:38+00:00"\n' +
        '        } \n' +
        '    } \n';


    const codeStringPolicy = '{\n' +
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

    const codeStringAttachPolicy = 'mac ~ % aws iam attach-user-policy --policy-arn arn:aws:iam::334439999999:policy/cx_policy --user-name cx_user'

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
                                <li> Create IAM User <br />
                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringCreateUser}
                                    </SyntaxHighlighter>
                                </li>

                                <li> Create a policy file named cx_policy.json <br />

                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringPolicy}
                                    </SyntaxHighlighter>
                                </li>

                                <li>Create a Policy<br />

                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringCreatePolicy}
                                    </SyntaxHighlighter>
                                </li>
                                <li> Add a Policy to your IAM user <br />
                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringAttachPolicy}
                                    </SyntaxHighlighter>
                                </li>
                                <li>
                                    Enter AWS credentials <br />
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
                            <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_cliwpsapi" target="_blank" rel="noreferrer noopener">Click here to refer IAM User creation</a>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default IAMUser

