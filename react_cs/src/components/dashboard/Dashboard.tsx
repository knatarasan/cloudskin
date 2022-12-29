import { useState, useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";
import logo from "../../static/images/cloud.png";
import { UserContext } from "../../context/Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("currentUser value from context :", currentUser);
  const [authenticated, setAuthenticated] = useState(currentUser);

  const handleLogout = (e: React.SyntheticEvent): void => {
    setAuthenticated({});
    // localStorage.setItem("authenticated", false);
    setCurrentUser({});
    console.log("handleLogout context is set to false", currentUser);
    navigate("/");

  };

  if (!authenticated) {
    console.log("not auth");
    return <Navigate replace to="/login" />;
  } else {
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
              <Navbar.Text>
                Signed in as: <a href="#login">{'username' in currentUser ? "welcome to " + currentUser.username : null}</a>
              </Navbar.Text>
              <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>


        <Container>
          <Row><br /></Row>
          <Row>
            <Col><h4> Plans </h4></Col>
            <Col></Col>
            <Col><Nav.Link href="/plan"><Button variant="outline-primary" size="sm">Create plan</Button></Nav.Link></Col>
            <Row>
            </Row>
          </Row>
          <Row><br /></Row>
          <Row>
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Plan Name</th>
                    <th>Deployed Status</th>
                    <th>Running Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dev App 1</td>
                    <td>Deployed </td>
                    <td>Running</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Prod App 1</td>
                    <td>Not Deployed</td>
                    <td>NA</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Prod App 2</td>
                    <td>Deployed</td>
                    <td>Running</td>
                  </tr>
                </tbody>
              </Table>


            </Col>
          </Row>
        </Container>

      </>
    );
  }
};

export default Dashboard;

