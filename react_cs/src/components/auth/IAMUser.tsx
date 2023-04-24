import { Container, Navbar, Nav, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../static/images/logo_only.png";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React, { useRef } from "react";
import api from "../../services/api";

const IAMUser = () => {
    const iam_user: any = useRef()
    const aws_key: any = useRef()
    const aws_secret: any = useRef()

    const storeAWSCreds = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        api.post("/aws_creds/", { aws_access_key_en: aws_key.current.value, aws_access_secret_en: aws_secret.current.value, aws_iam_user: iam_user.current.value })
            .then((response: { status: number; data: { access: any }; }) => {
                console.log('response from axios ', response)

                const accessToken = response.data.access
                localStorage.setItem("accessToken", accessToken);
                // TODO : After successful login accessToken can be stored in React Context
                iam_user.current.value = ""
                aws_key.current.value = ""
                aws_secret.current.value = ""

            })
            .catch(e => {
                console.log('Check your request ', e, e.response.status)
            });

    };

    const codeStringCreateUser =
        '    mac ~ % aws iam create-user --user-name  \n' +
        '    { \n' +
        '        "User": { \n' +
        '            "Path": "/", \n' +
        '            "UserName": "sc_user", \n' +
        '            "UserId": "AIDAU3XNRECYRMX00XXXX", \n' +
        '            "Arn": "arn:aws:iam::334431854769:user/sc_user", \n' +
        '            "CreateDate": "2023-01-16T18:22:47+00:00" \n' +
        '        } \n' +
        '    } \n'

    const codeStringCreatePolicy =
        'mac ~ % aws iam create-policy --policy-name sc_policy --policy-document file://sc_policy.json, \n' +
        '    { \n' +
        '       "Policy": { \n' +
        '            "PolicyName": "sc_policy", \n' +
        '            "PolicyId": "ANPAU3XNRECYZ5X00XXXX", \n' +
        '            "Arn": "arn:aws:iam::334439999999:policy/sc_policy", \n' +
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
        '                "ec2:DescribeAvailabilityZones",\n' +
        '                "ec2:DescribeVpcs",\n' +
        '                "ec2:DescribeRouteTables",\n' +
        '                "ec2:DescribeInternetGateways",\n' +
        '                "ec2:DescribeSecurityGroups",\n' +
        '                "ec2:DescribeSubnets"\n' +
        '                ],\n' +
        '            "Resource": "*"\n' +
        '        }\n' +
        '    ]\n' +
        '}'

    const codeStringAttachPolicy = 'mac ~ % aws iam attach-user-policy --policy-arn arn:aws:iam::334439999999:policy/sc_policy --user-name sc_user'

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={logo} width={50} height={"auto"} />
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

                            <h4> Create IAM User (AWS Console) </h4>
                            <video width="640" height="360" controls>
                                <source src="https://stratoclo.s3.us-west-1.amazonaws.com/create_iam_user.mp4" type="video/mp4" />
                            </video>

                            <ol>
                                <li> Create IAM Policy <br />
                                    <p>create a policy called sc_policy with sc_policy.json </p>

                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringPolicy}
                                    </SyntaxHighlighter>

                                </li>

                                <li> Create User called sc_user attach  sc_policy with it  <br />

                                </li>
                                <li> Create AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY  <br />

                                </li>

                                <li> Create Key pair called stratocl  <br />

                                </li>

                            </ol>
                            <br />
                            <br />
                            <h4> Create IAM User (AWS CLI) </h4>
                            <ol>
                                <li> Create IAM User <br />
                                    <SyntaxHighlighter language="json" style={docco}>
                                        {codeStringCreateUser}
                                    </SyntaxHighlighter>
                                </li>

                                <li> Create a policy file named sc_policy.json <br />

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
                                <br />
                                <br />
                                <br />
                                <br />

                                <div>
                                    <h4>Enter AWS credentials <br /></h4>
                                    <Container>
                                        <Row>
                                            <Col xs={6}>
                                                <Form onSubmit={storeAWSCreds}>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>AWS_USER (IAM)</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            ref={iam_user}
                                                            placeholder="iam user"
                                                            name="aws_user"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>AWS_ACCESS_KEY</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            ref={aws_key}
                                                            placeholder="aws_access_key"
                                                            name="aws_key"
                                                        />
                                                        <Form.Text className="text-muted">
                                                            We'll never share your email with anyone else.
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>AWS_SECRET_ACCESS_KEY</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            ref={aws_secret}
                                                            placeholder="aws_secret_access_key"
                                                            name="aws_secret"
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

