import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../static/images/cloud.png";
import { UserContext } from "../../context/Context";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const [] = useState(
  //   localStorage.getItem(localStorage.getItem("authenticated") || false)
  // );
  const users = [{ username: "jane", password: "jane" }];
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      // localStorage.setItem("authenticated", true);
      setCurrentUser({id:1,username:'admin'});
      console.log('User auth True is set at context', currentUser);
      navigate("/dashboard");
    }
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
      <br />
      sample user : jane
      <br />
      smaple pass : jane
    </div>
  );
};

export default Login;
