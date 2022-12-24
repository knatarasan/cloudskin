import DnDFlow from "./DndFlow";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/landing/home";
import Login from "./components/landing/login";
import Register from "./components/landing/register";


const App = () => {
  return (
    <Router>
      <div className="App">
        <ul className="App-header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
