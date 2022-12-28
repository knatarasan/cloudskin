import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../static/images/cloud.png";
import { UserContext } from "../../context/Context";
import { createUser } from "../../services/api.service";

const Register = () => {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
  const firstName = useRef();
  const lastName = useRef();

  // const handleSubmit = (e: React.SyntheticEvent): void => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // type RegisterData = {
    //   username: string,
    //   email: string,
    //   password: string,
    //   password2: string,
    //   first_name: string,
    //   last_name: string,
    // };

    // const registerData: RegisterData = {
    const registerData = {
      username: userName.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
    };
    console.log("username", userName.current.value);

    createUser(registerData);
    console.log("createUser called with registerData ", registerData);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6}>
            <a href="/">
              <img src={logo} width={75} height={"auto"} />
            </a>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                {/* inputRef={ref => { this.input = ref; }} */}
                <Form.Control
                  type="text"
                  ref={userName}
                  name="username"
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={email}
                  name="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={password}
                  name="password"
                  placeholder="Password"
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={password2}
                  name="confirmpassword"
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={firstName}
                  name="firstname"
                  placeholder="First Name"
                />
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lastName}
                  name="lastname"
                  placeholder="Last Name"
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
  );
};

export default Register;
