import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Container, Table, Col, Row, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PlanService from '../../services/plan.service'
import { useStore } from "../canvas/Store";
import DBNavbar from "../navbar/DashboardNavbar";
import '../../App.css'

const Dashboard = () => {
  const [plans, setPlans] = useState<any>();
  const user = useStore(state => state.user);

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
        <DBNavbar />
        <section>

          <Container className="">
            <Row><br /></Row>
            <Row>
              <Col><h4 className="app-color"> Plans </h4></Col>
              <Col></Col>
              <Col><Link to={`/plan/${null}`} data-testid="create_plan"><Button variant="outline-dark" size="sm">Create Plan</Button>
              </Link></Col>
              <Row>
              </Row>
            </Row>
            <Row><br /></Row>
            <Row>
              <Col>
                <Table striped bordered hover size="sm" className="app-color">
                  <thead>
                    <tr className="app-color">
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

                      <tr key={plan.plan_id} className="app-color">
                        <td ><Link to={`/plan/${plan.plan_id}`}>{plan.plan_id}</Link></td>
                        <td>{plan.owner}</td>
                        <td>{plan.deploy_status}</td>
                        <td>{plan.running_status}</td>
                        <td>
                          <Link to={`/plan/${plan.plan_id}`}><FaEdit className="app-color" /></Link>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </td>
                        <td>
                          <button onClick={() => deletePlan(plan.plan_id)}><FaTrashAlt className="app-color" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
};

export default Dashboard;

