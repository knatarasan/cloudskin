import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert} from "react-bootstrap";
import logo from "../../static/images/logo_stratoclo.png";
import AuthService from "../../services/auth.service";
import { useStore } from "../../store/Store";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("")

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
        setAlert(e.toString())
        handleShowAlert()
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
    <div>
            <div>
        {/* <button onClick={handleShowAlert}>Show Alert</button> */}
        {showAlert &&
          <Alert dismissible onClose={handleCloseAlert} variant="danger">
            {alert}
          </Alert>
        }
      </div>
      <Container>
        <Row>
          <Col xs={6}>
            <a href="/">
              <img src={logo} width={190} height={"auto"} />
            </a>
            <Form onSubmit={login}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="username"
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
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="password"
                />
              </Form.Group>
              <Button variant="primary" type="submit" data-testid="submit">
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
