import React from "react";
import Container from "react-bootstrap/Container";
import create_plan_img from "../../static/images/create_plan.png";
import how_to_use_img from "../../static/images/how_to_use_stratoclo.png"
import status_quo_img from "../../static/images/landing/status_quo.png"
import clean_img from "../../static/images/landing/clean_implementation.png"
import { Col, Row, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import HomeNavbar from "../navbar/HomeNavbar";
import '../../App.css'

const Pricing = () => {
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
                                <Card>
                                    <Card.Header>Free Plan: $0.00/month</Card.Header>
                                    <Card.Body>
                                        <ListGroupItem>1 Plan per account</ListGroupItem>
                                        <ListGroupItem>Up to 10 cloud assests <br/>(eg: ec2, s3 bucket etc)</ListGroupItem>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Header>Pro Plan: $29.99/month</Card.Header>
                                    <Card.Body>
                                        <ListGroupItem>15 Plan per account</ListGroupItem>
                                        <ListGroupItem>Up to 45 cloud assests total </ListGroupItem>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Premium Plan: $89.99/month</Card.Header>
                                    <Card.Body>
                                        <ListGroupItem>50 Plan per account</ListGroupItem>
                                        <ListGroupItem>Up to 150 cloud assests </ListGroupItem>
                                    </Card.Body>
                                </Card>
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
export default Pricing;
