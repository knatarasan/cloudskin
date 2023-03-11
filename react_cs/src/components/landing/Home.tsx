import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../static/images/logo_stratoclo.png";
import landing_page_img from "../../static/images/depict_product.png";
import create_plan_img from "../../static/images/create_plan.png";
import how_to_use_img from "../../static/images/how_to_use_stratoclo.png"
import { Link } from "react-router-dom";
import { Col, Row, Nav, Navbar, Button, Card } from "react-bootstrap";
import { FaSitemap, FaMap } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GrResources, GrConfigure, GrDeploy } from 'react-icons/gr';
import { GiHealthIncrease, GiPiggyBank } from 'react-icons/gi';
import { IoIosPulse } from 'react-icons/io';
import { useStore } from "../canvas/Store";
import Interested from "./Interested";

const Home = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = useStore(state => state.user);

  return (
    <div>
      <style type="text/css">
        {`

    .navbar-custom {
      background-color: #FFFFFF;
      font-size: 16px;
    }

    .landing-main {
      background-color: #FCE2D7;
      color: #491619;
    }

    .alternate-section {
      background-color: #FFFFFF;
      color: #4B7949;
    }

    .navbar-custom .navbar-brand,
    .navbar-custom .navbar-text {
      color: green;
    }

    .get-started {
      display: block;
      width: 25%;
      background-color: #FFFFFF;
      color: #491619;
      border: 2px solid black;
      padding: 10px;
      border-radius: 5px;
    }

    .card-font {
      color: #491619;
    }

    .card-bg-gradient {
      background: linear-gradient(to right, #ffffff,#FCE2D7);
    }

    .card-feature-bg-gradient {
      background: linear-gradient(to right, #ffffff,#FCE2D7);
    }
    .alt-bg {
      background: #FCE2D7
    }

    .card-title-motivation-gradient {
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(to right, #700808,#ff3838);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

    .card-title-features-gradient {
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(to right, #0711db,
        #2f39fa, #525aff, #4d85ff, #02bae3);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

    `}
      </style>

      <main className="flex-shrink-0">
        {/* Navigation */}
        <Navbar className="navbar sticky-top navbar-expand-lg navbar-custom" >
          <div className="container px-5">
            <Link to="/">
              <Navbar.Brand>
                <img src={logo} width={200} height={"auto"}></img>
              </Navbar.Brand>
            </Link>
            <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></Button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                  if (user.loggedIn) {
                    return (
                      <>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="">Signed in: {user.username}</Nav.Link>
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
        <header className="py-5 landing-main" >
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder mb-2">Navigate Cloud Easier</h1>
                  <p className="lead fw-normal mb-4">
                    No need of cloud expertise, all default configs taken care ( Right VM size, right PG version selected)
                    No code cloud deployment<br />
                    One click deployment<br />
                    Best practices applied, <strong>you can focus on your business</strong><br />
                  </p>
                </div>
              </div>
              <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={how_to_use_img} alt="..." /></div>
            </div>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
              <a className="btn btn-light btn-lg px-4 me-sm-3 get-started" href="#features">Get Started</a>
              <a className="btn btn-outline-light btn-lg px-4 get-started" href="#!">Learn More</a>
            </div>
          </div>
        </header>

        {/* <!-- Motivation section--> */}
        <section className="py-5 alt-bg card-font" id="features">
          <Container>
            <Row className="text-center">
              <h4 className="fw-bolder mb-0">Current deployment process is complex, slow and requires deeper expertise in AWS </h4>
            </Row>
            <br />
            <br />
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Card
                  border="light"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Infrastructure Complexity:</strong></Card.Title><br />
                    <Card.Text>
                      In the cloud, you are responsible for managing the infrastructure that your applications run on. This includes things like choosing the right instance types, setting up load balancers, and configuring network and security settings.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="light"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Managing dependencies:</strong></Card.Title>
                    <Card.Text>
                      Cloud applications often have a lot of dependencies, such as third-party libraries and APIs. Managing these dependencies can be complex, especially if you need to ensure that they are all compatible with each other and with the cloud platform you are using.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="light"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Security:</strong></Card.Title>
                    <Card.Text>
                      Ensuring that your applications are secure in the cloud is important, but it can also be complex. You need to consider things like access controls, encryption, and network security.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <Row xs={1} md={3} className="g-4">
              <Col >
                <Card
                  border="light"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Scaling and availability:</strong></Card.Title>
                    <Card.Text>
                      In the cloud, you need to design your applications to be scalable and highly available. This means designing them to be able to handle sudden increases in traffic, and to be able to recover from failures without downtime.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="light"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Integration with other services:</strong></Card.Title>
                    <Card.Text>
                      Cloud platforms offer a wide range of services that can be used to build and deploy applications. However, integrating these services can be complex, especially if you need to connect them to on-premises systems or other third-party services.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col></Col>
            </Row>
            <br />
            <br />
          </Container>

          <Row className="text-center">
            <h2><strong>At StratoClo we deploy and manage your cloud application</strong></h2>
          </Row>
        </section>

        {/* <!-- Features section--> */}
        <section className="py-5 alternate-section card-font" id="features">
          <Container>
            <Row className="text-center">
              <h5 className="fw-bolder mb-0">FEATURES:</h5>
              <h2 className="fw-bolder mb-0">Deploy your application simply and fast</h2>
            </Row>
            <br />
            <br />
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><FaSitemap /> <AiOutlineArrowRight /> <FaMap /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Infrastructure as a plan:</strong></Card.Title><br />
                    <Card.Text>
                      This allows you to use block elements to define and manage your infrastructure, rather than manually configuring resources through a user interface.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><GrResources /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Resource provisioning:</strong></Card.Title>
                    <Card.Text>
                      We will be mindful of creating and provisioning new resources, such as virtual machines or storage containers.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><GiHealthIncrease /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Scalability:</strong></Card.Title>
                    <Card.Text>
                      We will scale up or down your infrastructure and applications in response to changing demands.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
            <Row xs={1} md={3} className="g-4">
              <Col >
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >

                  <Card.Body>
                    <h1><GrConfigure /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Configuration management:</strong></Card.Title>
                    <Card.Text>
                      StratoClo applies all best practice configurations and maintaining your infrastructure and applications. (and encourage you to override if necessary only)
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><GrDeploy /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Deployment automation:</strong></Card.Title>
                    <Card.Text>
                      StratoClo takes care of releasing updates and new versions of your applications.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><IoIosPulse /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Monitoring and alerting:</strong></Card.Title>
                    <Card.Text>
                      We monitor and manage your infrastructure and applications (and will solve any problems raised by the application).
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Card
                  border="dark"
                  key="light"
                  text='dark'
                  style={{ width: '18rem', border: '3px solid' }}
                  className="col mb-5 mb-md-0 h-100 card-feature-bg-gradient shadow-lg p-3 mb-5 bg-white rounded"
                >
                  <Card.Body>
                    <h1><GiPiggyBank /></h1>
                    <Card.Title className="card-title-features-gradient"><strong>Cost optimization:</strong></Card.Title>
                    <Card.Text>
                      StratoClo helps you optimize your use of resources in order to minimize costs.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
          </Container>
        </section>

        {/* <!-- Process section--> */}
        <section className="py-5 landing-main" id="features">
          <div className="container px-5 my-5">
            <Container>
              <Row className="text-center">
                <h2 className="h5">PROCESS:</h2>
                <h2 className="fw-bolder mb-0">Deploy your app in 3 steps </h2>

              </Row>
              <br />
              <br />
              <Row>
                <Col >
                  <h2 className="h5">1 Create Plan</h2>
                  <p className="mb-0">
                    Select components like App, Load Balancers and drag and drop to plan area
                  </p>
                </Col>
                <Col><img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." /></Col>
              </Row>
              <br />
              <br />
              <Row className="bg-light">
                <Col><img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." /></Col>
                <Col >
                  <h2 className="h5">2 Configure Plan</h2>
                  <p className="mb-0">
                    Configure EC2.  <br />
                    Configure DataBase<br />
                    Configure Load Balancer<br />
                  </p>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col >
                  <h2 className="h5">3 Deploy Plan</h2>
                  <p className="mb-0">
                    Configure EC2 IAM<br />
                    Deploy App : Create required AWS assets in backend
                  </p>
                </Col>
                <Col><img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." /></Col>
              </Row>
              <br />
              <br />
              <Row className="bg-light">
                <Col><img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." /></Col>
                <Col >
                  <h2 className="h5">4 Monitor Plan</h2>
                  <p className="mb-0">
                    Monitor health of  EC2  <br />
                    Monitor health of  DataBase  <br />
                    Monitor health of  LoadBalancer  <br />
                  </p>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Interested />

            </Container>
          </div>
        </section>


        {/* <!-- Status Quo section--> */}
        <section className="py-5 alternate-section card-font" id="interested">
          <div className="container px-5 my-5">
            <Container>
              <Row>
                <Col >
                  <p className="mb-0 text-center">Status Quo</p>
                  <h2 className="h5  text-center">Complexity</h2>
                  <img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." />
                </Col>
                <Col>
                  <p className="mb-0 text-center">Simplified Deployment</p>
                  <h2 className="h5  text-center">Piece of Mind</h2>
                  <img className="img-fluid rounded-3 my-5" width="100%" src={create_plan_img} alt="..." />
                </Col>
              </Row>
            </Container>
          </div>
        </section>


        {/* <!-- Blog preview section--> */}
        <section className="py-5 landing-main">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6">
                <div className="text-center">
                  <h2 className="fw-bolder">From our blog</h2>
                  <p className="lead fw-normal mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque fugit ratione dicta mollitia. Officiis ad.</p>
                </div>
              </div>
            </div>
            <div className="row gx-5">
              <div className="col-lg-4 mb-5">
                <div className="card h-100 shadow border-0">
                  <img className="card-img-top" src="https://dummyimage.com/600x350/ced4da/6c757d" alt="..." />
                  <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">Blog post title</h5></a>
                    <p className="card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                        <div className="small">
                          <div className="fw-bold">Kelly Rowan</div>
                          <div className="text-muted">March 12, 2022 &middot; 6 min read</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="card h-100 shadow border-0">
                  <img className="card-img-top" src="https://dummyimage.com/600x350/adb5bd/495057" alt="..." />
                  <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">Media</div>
                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">Another blog post title</h5></a>
                    <p className="card-text mb-0">This text is a bit longer to illustrate the adaptive height of each card. Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                        <div className="small">
                          <div className="fw-bold">Josiah Barclay</div>
                          <div className="text-muted">March 23, 2022 &middot; 4 min read</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="card h-100 shadow border-0">
                  <img className="card-img-top" src="https://dummyimage.com/600x350/6c757d/343a40" alt="..." />
                  <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">The last blog post title is a little bit longer than the others</h5></a>
                    <p className="card-text mb-0">Some more quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                        <div className="small">
                          <div className="fw-bold">Evelyn Martinez</div>
                          <div className="text-muted">April 2, 2022 &middot; 10 min read</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <!-- Call to action--> */}

      {/* // <!-- Footer--> */}
      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto"><div className="small m-0 text-white">&copy; 2023 StratoClo. All rights reserved.</div></div>
            <div className="col-auto">
              <a className="link-light small" href="#!">Privacy</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Terms</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Bootstrap core JS--> */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      {/* <!-- Core theme JS--> */}
      <script src="js/scripts.js"></script>
    </div>
  );
}

export default Home;
