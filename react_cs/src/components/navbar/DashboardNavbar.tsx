import React from "react"
import { useNavigate, Link } from "react-router-dom";
import logo from "../../static/images/logo_only.png";
import { Navbar, Nav, Button } from "react-bootstrap"
import { useStore } from "../canvas/Store";
import AuthService from "../../services/auth.service";
import '../../App.css'

const selector = (state) => ({
    user: state.user,
    addUser: state.addUser,
});

const DBNavbar = () => {
    const navigate = useNavigate();

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

    return (
        <Navbar className="navbar sticky-top bg-light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Link to="/">
                    <Navbar.Brand>
                        <img src={logo} width={50} height={"auto"}></img>
                    </Navbar.Brand>
                </Link>
                <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></Button>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0  navbar">

                    {(() => {
                        if (user.loggedIn) {
                            return (
                                <>
                                    <Nav.Link className="app-color" as={Link} to="#">Feedback</Nav.Link>
                                    <Nav.Link className="app-color" as={Link} to="/IAMUser">Prep_aws_User</Nav.Link>
                                    <Nav.Link className="app-color" href="">Signed in: {user.username}</Nav.Link>
                                    <Nav.Link className="app-color" href="" onClick={handleLogout}>Logout</Nav.Link>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <Nav.Link className="app-color" href="/login">Login</Nav.Link>
                                    <Nav.Link className="app-color" href="/register">Sign Up</Nav.Link>
                                </>
                            )
                        }
                    })()}
                </ul>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default DBNavbar