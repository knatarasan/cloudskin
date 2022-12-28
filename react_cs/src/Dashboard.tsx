import { useEffect, useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { UserContext } from "./Context";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("currentUser value from context :", currentUser);
  const [authenticated, setAuthenticated] = useState(currentUser);

  const handleLogout = (e: React.SyntheticEvent): void => {
    setAuthenticated(false);
    // localStorage.setItem("authenticated", false);
    setCurrentUser(false);
    console.log("handleLogout context is set to false", currentUser);
  };

  if (!authenticated) {
    console.log("not auth");
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        {/* <a href="/home">home</a> */}
        <Link to="/">Home</Link>
        <br />
        <Link to="/plan">Plan</Link>
        <p>Welcome to your Dashboard</p>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>{" "}
      </div>
    );
  }
};

export default Dashboard;
