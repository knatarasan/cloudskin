import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../static/images/cloud.png";
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { Col, Row, Nav, Navbar } from "react-bootstrap";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img src={logo} width={50} height={"auto"}></img>
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <>
              {(() => {
                if (currentUser && "loggedIn" in currentUser) {
                  return (
                    <>
                      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                      <Nav.Link href="">Signed in: {currentUser.username}</Nav.Link>
                    </>
                  )
                } else {
                  return (
                    <>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/register">Sign Up</Nav.Link>
                    </>
                  )
                }
              })()}
            </>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <Container>
        <Row>
          <Col>      <h1>Welcome to auto deploy</h1></Col>
        </Row>
        <Row>
          <Col>
            <h3>We can offer:<br /></h3>
            <ul>
              <li>&nbsp;&nbsp;&nbsp; No code cloud deployment<br /></li>
              <li>&nbsp;&nbsp;&nbsp; One click deployment<br /></li>
              <li>&nbsp;&nbsp;&nbsp; Best practices applied, <strong>you can focus on your business</strong><br /></li>
            </ul>



          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;