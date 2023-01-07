import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../static/images/logo3.png";
import landing_page_img from "../../static/images/depict_product.png";
import create_plan_img from "../../static/images/create_plan.png";
import how_to_use_img from "../../static/images/landing_page_eng.png"
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { Col, Row, Nav, Navbar, Button, Card } from "react-bootstrap";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>


      <style type="text/css">
        {`

    .navbar-custom {
      background-color: #72ADDE;
    }
    .navbar-custom .navbar-brand,
    .navbar-custom .navbar-text {
      color: green;
    }

    .card-title-motivation-gradient {
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(to right, #fa0202,
        #fc0a0a, #ff1717, #ff2424, #ff3838);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;

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
                <img src={logo} width={75} height={"auto"}></img>
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
        <header className="bg-primary py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Deploy an App in Cloud in Minutes</h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    No need of cloud expertise, all default configs taken care ( Right VM size, right PG version selected)
                    No code cloud deployment<br />
                    One click deployment<br />
                    Best practices applied, <strong>you can focus on your business</strong><br />
                  </p>

                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                    <a className="btn btn-light btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                    <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={how_to_use_img} alt="..." /></div>
            </div>
          </div>
        </header>

        {/* <!-- Motivation section--> */}
        <section className="py-5" id="features">

          <Container>
            <Row className="text-center">
              <h2 className="fw-bolder mb-0">Current deployment process is complex, slow and requires deeper expertise in AWS </h2>
            </Row>
            <br />
            <br />
            <Row>
              <Col>
                <Card
                  bg="#F8F4F3"
                  background-image="card-title-motivation-gradient"
                  border="danger"
                  key="light"
                  text='dark'
                  style={{ width: '18rem' }}
                  className="col mb-5 mb-md-0 h-100"
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

                  bg="#F8F4F3"
                  border="danger"
                  key="light"
                  text='dark'
                  style={{ width: '18rem' }}
                  className="col mb-5 mb-md-0 h-100"
                >

                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Managing dependencies:</strong></Card.Title>
                    <Card.Text>
                      Cloud applications often have a lot of dependencies, such as third-party libraries and APIs. Managing these dependencies can be complex, especially if you need to ensure that they are all compatible with each other and with the cloud platform you are using.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="bg-light">
              <Col>
                <Card
                  bg="#F8F4F3"
                  border="danger"
                  key="light"
                  text='dark'
                  style={{ width: '18rem' }}
                  className="col mb-5 mb-md-0 h-100"
                >

                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Security:</strong></Card.Title>
                    <Card.Text>
                      Ensuring that your applications are secure in the cloud is important, but it can also be complex. You need to consider things like access controls, encryption, and network security.
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col >
                <Card
                  bg="#F8F4F3"
                  border="danger"
                  key="light"
                  text='dark'
                  style={{ width: '18rem' }}
                  className="col mb-5 mb-md-0 h-100"
                >

                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Scaling and availability:</strong></Card.Title>
                    <Card.Text>
                      In the cloud, you need to design your applications to be scalable and highly available. This means designing them to be able to handle sudden increases in traffic, and to be able to recover from failures without downtime.
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col >
              </Col>
              <Col>
                <Card
                  bg="#F8F4F3"
                  border="danger"
                  key="light"
                  text='dark'
                  style={{ width: '18rem' }}
                  className="col mb-5 mb-md-0 h-100"
                >

                  <Card.Body>
                    <Card.Title className="card-title-motivation-gradient"><strong>Integration with other services:</strong></Card.Title>
                    <Card.Text>
                      Cloud platforms offer a wide range of services that can be used to build and deploy applications. However, integrating these services can be complex, especially if you need to connect them to on-premises systems or other third-party services.
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
            </Row>
            <br />
            <br />
          </Container>

          <Row className="text-center">
            <h2 className="h5">At ClEffex we deploy and manage your cloud application </h2>
          </Row>


        </section>

        {/* <!-- Features section--> */}
        <section className="py-5 bg-light" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h2 className="h5">FEATURES:</h2>
                <h2 className="fw-bolder mb-0">Deploy your application simply and fast </h2></div>
              <div className="col-lg-8">
                <div className="row gx-5 row-cols-1 row-cols-md-2">
                  <div className="col mb-5 mb-md-0 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h5">Infrastructure as a plan:</h2>
                    <p className="mb-0">
                      This allows you to use block elements to define and manage your infrastructure, rather than manually configuring resources through a user interface.
                    </p>
                  </div>
                  <div className="col mb-5 mb-md-0 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h5">Resource provisioning:</h2>
                    <p className="mb-0">
                      We will be mindful of creating and provisioning new resources, such as virtual machines or storage containers.
                    </p>
                  </div>

                  <div className="col mb-5 mb-md-0 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h5">Scalability:</h2>
                    <p className="mb-0">
                      We will scale up or down your infrastructure and applications in response to changing demands.
                    </p>
                  </div>

                  <div className="col h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h5">Configuration management: </h2>
                    <p className="mb-0"> ClEffex applies all best practice configurations and maintaining your infrastructure and applications. (and encourage you to override if necessary only)</p>
                  </div>
                  <div className="col mb-5 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                    <h2 className="h5">Deployment automation:</h2>
                    <p className="mb-0">ClEffex takes care of releasing updates and new versions of your applications.</p>
                  </div>

                  <div className="col mb-5 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                    <h2 className="h5">Monitoring and alerting:</h2>
                    <p className="mb-0">We monitor and manage your infrastructure and applications (and will solve any problems raised by the application).</p>
                  </div>

                  <div className="col mb-5 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                    <h2 className="h5">Cost optimization:</h2>
                    <p className="mb-0">CLeFFeX helps you optimize your use of resources in order to minimize costs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Process section--> */}
        <section className="py-5" id="features">
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
            </Container>
          </div>
        </section>

        {/* <!-- Cant wait--> */}
        <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
          <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
            <div className="mb-4 mb-xl-0">
              <div className="fs-3 fw-bold text-white">Wanna join our waitlist</div>
            </div>
            <div className="ms-xl-4">
              <div className="input-group mb-2">
                <input className="form-control" type="text" placeholder="Email address..." aria-label="Email address..." aria-describedby="button-newsletter" />
                <button className="btn btn-outline-light" id="button-newsletter" type="button">Sign up</button>
              </div>
              <div className="text-white-50">Sign up for our newsletter for the latest updates.</div>
            </div>
          </div>
        </aside>

        {/* <!-- Status Quo section--> */}
        <section className="py-5" id="features">
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
        <section className="py-5 bg-light">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6">
                <div className="text-center">
                  <h2 className="fw-bolder">From our blog</h2>
                  <p className="lead fw-normal text-muted mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque fugit ratione dicta mollitia. Officiis ad.</p>
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
      <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
        <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
          <div className="mb-4 mb-xl-0">
            <div className="fs-3 fw-bold text-white">To know more about deploy your app fast</div>
            <div className="text-white-50">Sign up for our newsletter for the latest updates.</div>
          </div>
          <div className="ms-xl-4">
            <div className="input-group mb-2">
              <input className="form-control" type="text" placeholder="Email address..." aria-label="Email address..." aria-describedby="button-newsletter" />
              <button className="btn btn-outline-light" id="button-newsletter" type="button">Sign up</button>
            </div>
            <div className="small text-white-50">We care about privacy, and will never share your data.</div>
          </div>
        </div>
      </aside>

      {/* // <!-- Footer--> */}
      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2022</div></div>
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
