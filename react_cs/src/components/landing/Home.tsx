import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../static/images/cloud.png";
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("currentUser value from context :", currentUser);

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
            {/* <Nav.Link> */}
            <Link to="/dashboard"> {currentUser ? "Dashboard" : null}</Link>
            {/* </Nav.Link> */}
            <Nav.Link href="/login">{!currentUser ? "Login" : null}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <h1>Welcome to App</h1>
    </div>
  );
}

export default Home;
