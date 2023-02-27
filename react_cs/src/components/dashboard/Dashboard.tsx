import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import logo from "../../static/images/logo3.png";
import PlanService from '../../services/plan.service'
import AuthService from "../../services/auth.service";
import useStore from "../canvas/Store";

const selector = (state) => ({
  user: state.user,
  addUser: state.addUser,
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();
  const { user, addUser } = useStore(selector);

  const handleLogout = (e: React.SyntheticEvent): void => {
    AuthService.logout()
    .then((response) => { 
      console.log("logout response", response)
      // Updata store with empty user after successful logout
      addUser({ username: "", email: "", loggedIn: false, access_token: "" });
    })

    console.log("handleLogout context is set to false", user.username);
    navigate("/");
  };

  useEffect(() => {
    PlanService.getUserPlans()
      .then((response: any): void => {
        setPlans(response.data)
      })
  }, [])

  const deletePlan = (id: string) => {
    console.log("id", id)
    PlanService.deletePlan(id)
      .then((response) => {
        setPlans(plans.filter((plan: any) => plan.plan_id !== id))
        console.log("Plan has been deleted")
      })
      .catch((error) => {
        console.log("Plan not deleted", error)
      })

  }

  if (!user.loggedIn) {
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
                {'username' in user ? "Signed in: " + user.username : null}
              </Navbar.Text>
              <Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
              <Nav.Link as={Link} to="/iamuser">IAM User</Nav.Link>
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
                    <th>Edit Plan</th>
                    <th>Delete Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {console.log('plans here',plans)} */}
                  {plans?.map((plan: any) => (

                    <tr id={plan.plan_id}>
                      <td>
                        <Link to={`/plan/${plan.plan_id}`}>{plan.plan_id}</Link></td>
                      <td>{plan.owner}</td>
                      <td>{plan.deploy_status}</td>
                      <td>{plan.running_status}</td>
                      <td>
                        <Link to={`/plan/${plan.plan_id}`}><FaEdit /></Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                      <td>
                        <button onClick={() => deletePlan(plan.plan_id)}><FaTrashAlt /></button>
                      </td>
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

