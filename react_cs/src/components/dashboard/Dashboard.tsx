import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";
import logo from "../../static/images/Clouds-with-gears-altair-enhanced.png";
import { UserContext } from "../../context/Context";
import { authAxios } from "../auth/AuthServiceAxios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();
  const { currentUser, setCurrentUser } = useContext(UserContext);
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

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    console.log("handleLogout context is set to false", currentUser);
    navigate("/");
  };

  useEffect(() => {
    authAxios.get("/plan/")
      .then((response: any): void => {
        setPlans(response.data)
      })
  }, [])


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
              <Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Row><br /></Row>
          <Row>
            <Col><h4> Plans </h4></Col>
            <Col></Col>
            <Col><Link to={`/plan/${null}`}><Button variant="outline-primary" size="sm">Create plan</Button></Link></Col>
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
                      <td>
                        <Link to={`/plan/${plan.id}`}>{plan.id}</Link></td>
                      <td>{plan.owner}</td>
                      <td>{plan.deploy_status}</td>
                      <td>{plan.running_status}</td>
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

