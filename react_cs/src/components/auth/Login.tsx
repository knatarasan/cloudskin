import React, { useState, useContext } from "react";
import { api_host } from "../../env/global";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from 'react-bootstrap/Alert';
import logo from "../../static/images/cloud.png";
import { UserContext } from "../../context/Context";
import jwt_decode from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const [] = useState(
  //   localStorage.getItem(localStorage.getItem("authenticated") || false)
  // );
  const users = [{ username: "jane", password: "jane" }];

  type MyUser = {
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

    fetch(`${api_host}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then((response) => {
      if (response.status !== 200) {
        console.log("Something went wrong!");
      }
      return response.json()
    }).then((data) => {
      const decoded_token: MyUser = jwt_decode(data.access)
      setCurrentUser({ username: username, email: decoded_token.email, tokenAccess: data.access, tokenRefresh: data.refresh, loggedIn: true });
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
    })
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
