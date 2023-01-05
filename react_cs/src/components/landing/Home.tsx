import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../static/images/cloud.png";
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { Col, Row, Nav, Navbar, Button } from "react-bootstrap";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      {/* Navigation */}
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <Link to="/">
            <Navbar.Brand>
              <img src={logo} width={50} height={"auto"}></img>
            </Navbar.Brand>
          </Link>
          <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></Button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>              
              <li className="nav-item"><a className="nav-link" href="pricing.html">Pricing</a></li>
              <li className="nav-item"><a className="nav-link" href="faq.html">FAQ</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                  <li><a className="dropdown-item" href="blog-home.html">Blog Home</a></li>
                  <li><a className="dropdown-item" href="blog-post.html">Blog Post</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Portfolio</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                  <li><a className="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                  <li><a className="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                </ul>
              </li>
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
            </ul>
          </div>
        </div>
      </Navbar>
      {/* Header */}
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-5 fw-bolder text-white mb-2">Welcome to auto deploy</h1>
                <p className="lead fw-normal text-white-50 mb-4">
                  No code cloud deployment<br />
                  One click deployment<br />
                  Best practices applied, <strong>you can focus on your business</strong><br />
                </p>

                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                  <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /></div>
          </div>
        </div>
      </header>
      <br />
      <br />
    </div>
  );
}

export default Home;
