import React from "react"
import { useNavigate, Link } from "react-router-dom";
import logo from "../../static/images/logo_stratoclo.png";
import { Navbar, Nav, Button } from "react-bootstrap"
import { useStore } from "../canvas/Store";
import AuthService from "../../services/auth.service";
import '../../App.css'

const selector = (state) => ({
    user: state.user,
    addUser: state.addUser,
});

const SCNavbar = () => {
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
        <div>
            <Navbar className="navbar sticky-top navbar-expand-lg navbar-custom app-color" >
                <div className="container px-5">
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={logo} width={200} height={"auto"}></img>
                        </Navbar.Brand>
                    </Link>
                    <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></Button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0  navbar">
                            <li className="nav-item"><a className="nav-link app-color" href="pricing.html">Pricing</a></li>
                            <li className="nav-item"><a className="nav-link app-color" href="faq.html">FAQ</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle app-color" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                    <li><a className="dropdown-item" href="blog-home.html">Blog Home</a></li>
                                    <li><a className="dropdown-item" href="blog-post.html">Blog Post</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle app-color" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Portfolio</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                    <li><a className="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                                    <li><a className="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                                </ul>
                            </li>
                            {(() => {
                                if (user.loggedIn) {
                                    return (
                                        <>
                                            <Nav.Link className="app-color" as={Link} to="/dashboard">Dashboard</Nav.Link>
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
                    </div>
                </div>
            </Navbar>
        </div>
    )
}


export default SCNavbar