import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, } from "react-bootstrap";
import logo from "../../static/images/logo3.png";
import { UserContext } from "../../context/Context";
import jwt_decode from "jwt-decode";
import { authAxios } from "./AuthServiceAxios";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  type User = {
    email: string,
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
    user_id: number,
    username: string
  }

  const login = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    authAxios.post("/token/", { username: username, password: password })
      .then((response: { status: number; data: { access: any }; }) => {
        console.log('response from axios ', response)

        const accessToken = response.data.access
        localStorage.setItem("accessToken", accessToken);
        // TODO : After successful login accessToken can be stored in React Context
        
        const decoded_token: User = jwt_decode(accessToken)
        setCurrentUser({ username: username, email: decoded_token.email, tokenAccess: accessToken, loggedIn: true });
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
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
