import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, } from "react-bootstrap";
import logo from "../../static/images/logo3.png";
import AuthService from "../../services/auth.service";
import { useStore } from "../canvas/Store";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const addUser = useStore(state => state.addUser)

  type User = {
    pk: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string
  }


  const login = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    AuthService.login(username, password)
      .then((response: { access_token: string; user: User }) => {
        console.log('response from axios ', response)
        addUser({ username: response.user.username, email: response.user.email, loggedIn: true, access_token: response.access_token });
        navigate("/dashboard");
      })
      .catch(e => {
        console.log('Check your request ', e, e.response.status)
        navigate("/login");
      });

  };


  return (
    <div>
      <Container>
        <Row>
          <Col xs={6}>
            <a href="/">
              <img src={logo} width={75} height={"auto"} />
            </a>
            <Form onSubmit={login}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
