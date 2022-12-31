import { useState, useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";
import logo from "../../static/images/cloud.png";
import { UserContext } from "../../context/Context";


const Dashboard = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();

  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log("currentUser value from context :", currentUser);
  const [authenticated, setAuthenticated] = useState(currentUser);

  const handleLogout = (e: React.SyntheticEvent): void => {
    setAuthenticated({
      username: '',
      email: '',
      tokenAccess: '',
      tokenRefresh: '',
      loggedIn: false
    });
    setCurrentUser(undefined);
    console.log("handleLogout context is set to false", currentUser);
    navigate("/");
  };

  const loadPlan = (e: React.SyntheticEvent): void => {

    // console.log("Current User at Dash. ", currentUser.tokenAccess);
    fetch("http://127.0.0.1:3000/graph/", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser.tokenAccess
      }
    }).then((response) => {

      if (response.status !== 200) {
        console.log("Something went wrong!", response);
      }
      return response.json()
    }).then((data) => {
      console.log('data is ', data)
      setPlans(data)
    })
  }
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
                {'username' in currentUser ? "Signed in:  " + currentUser.username : null}
              </Navbar.Text>
              <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>


        <Container>
          <Row><br /></Row>
          <Row>
            <Col><h4> Plans </h4></Col>
            <Col><Nav.Link href=""><Button variant="outline-primary" onClick={loadPlan} size="sm">Load Plans</Button></Nav.Link></Col>
            {/* <Col><Nav.Link href="/plan"><Button variant="outline-primary" size="sm">Create plan</Button></Nav.Link></Col> */}
            <Col><Link to="/plan"><Button variant="outline-primary" size="sm">Create plan</Button></Link></Col>

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
                  {/* {console.log('plans here',plans)} */}
                  {plans?.map((plan: any) => (
                    <tr>
                      <td>{plan.id}</td>
                      <td>{plan.owner}</td>
                      <td>{plan.graph.key}</td>
                      <td>{plan.owner}</td>
                    </tr>
                  ))}
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

