import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import { Button, Alert, Form, Container, Row, Col } from "react-bootstrap";
import logo from "../../static/images/logo_stratoclo.png";
import AuthService from "../../services/auth.service";
import { useStore } from "../canvas/Store";

const Register = () => {
  const userName: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const password2: any = useRef();
  const firstName: any = useRef();
  const lastName: any = useRef();
  const navigate: any = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("")

  const addUser = useStore(state => state.addUser);

  // const handleSubmit = (e: React.SyntheticEvent): void => {
  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.register(userName.current.value, email.current.value, password.current.value, password.current.value)
      .then((response) => {
        // if(response.response.data=="") {

        // }
        console.log('response from axios ', response)
        addUser({ username: response.user.username, email: response.user.email, loggedIn: true, access_token: response.access_token });
        navigate("/dashboard");
      })
      .catch(e => {
        console.log('Check your request ', e.toString())
        setAlert(e.toString())
        handleShowAlert()
        // navigate("/login");
      });


  };

  const handleShowAlert = () => {
    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlert("")
  }

  return (
    <>
      <div>
        {/* <button onClick={handleShowAlert}>Show Alert</button> */}
        {showAlert &&
          <Alert dismissible onClose={handleCloseAlert} variant="danger">
            {alert}
          </Alert>
        }
      </div>


      <div>
        <Container>
          <Row>
            <Col xs={6}>
              <a href="/">
                <img src={logo} width={190} height={"auto"} />
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
                    data-testid="username"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={email}
                    name="email"
                    placeholder="Enter email"
                    data-testid="email"
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
                    data-testid="password"
                  />
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={password2}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    data-testid="confirmpassword"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={firstName}
                    name="firstname"
                    placeholder="First Name"
                    data-testid="firstname"
                  />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={lastName}
                    name="lastname"
                    placeholder="Last Name"
                    data-testid="lastname"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" data-testid="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
