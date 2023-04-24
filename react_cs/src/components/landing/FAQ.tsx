import React from "react";
import Container from "react-bootstrap/Container";
import create_plan_img from "../../static/images/create_plan.png";
import how_to_use_img from "../../static/images/how_to_use_stratoclo.png"
import status_quo_img from "../../static/images/landing/status_quo.png"
import clean_img from "../../static/images/landing/clean_implementation.png"
import { Col, Row, Card } from "react-bootstrap";
import { FaSitemap, FaMap } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GrResources, GrConfigure, GrDeploy } from 'react-icons/gr';
import { GiHealthIncrease, GiPiggyBank } from 'react-icons/gi';
import { IoIosPulse } from 'react-icons/io';
import Interested from "./Interested";
import HomeNavbar from "../navbar/HomeNavbar";
import '../../App.css'

const FAQ = () => {
    return (
        <div>
            <main className="flex-shrink-0">
                {/* Navigation */}
                <HomeNavbar />

                {/* Faq content */}

                <section className="py-5 app" id="headers">
                    <Container>
                        <Row className="text-center">
                            <Col>
                                <h1 className="display-5 fw-bolder mb-2">Frequently Aasked Questions</h1>
                            </Col>
                        </Row>
                        <br />




                        <Row>
                            <Col>
                                <h4 className="fw-bolder mb-0">What is StratoClo?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    StratoClo is a cloud management platform that helps make navigating and managing cloud infrastructure easier. It takes care of tasks like resource provisioning, configuration management, and deployment automation, so you can focus on your business.
                                </p>
                            </Col>
                            <Col>
                                <h4 className="fw-bolder mb-0">What makes StratoClo different from other cloud management platforms?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    StratoClo is designed to be simple and easy to use, with a one-click deployment process and default configurations that take care of many of the complex tasks involved in managing cloud infrastructure. It also applies best practices to ensure that your infrastructure and applications are secure and scalable.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4 className="fw-bolder mb-0">Do I need to have expertise in cloud management to use StratoClo?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    No, StratoClo is designed for users who may not have expertise in cloud management. It takes care of many of the complex tasks involved in managing cloud infrastructure, so you can focus on your business.
                                </p>
                            </Col>
                            <Col>
                                <h4 className="fw-bolder mb-0">How does StratoClo ensure that my applications are secure?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    StratoClo applies best practices for security, including access controls, encryption, and network security. It also monitors and manages your infrastructure and applications to detect and solve any security problems.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4 className="fw-bolder mb-0">Can I customize the configurations used by StratoClo?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    Yes, StratoClo allows you to override the default configurations if necessary, but it applies best practices by default to ensure that your infrastructure and applications are secure and scalable.
                                </p>
                            </Col>
                            <Col>
                                <h4 className="fw-bolder mb-0">How does StratoClo help optimize my use of resources?</h4>
                                <p className="lead fw-normal mb-4" style={{ textAlign: "left" }}>
                                    StratoClo helps optimize your use of resources by scaling up or down your infrastructure and applications in response to changing demands, and by monitoring your infrastructure usage to identify opportunities to minimize costs.
                                </p>
                            </Col>
                        </Row>
                    </Container>
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

export default FAQ;
