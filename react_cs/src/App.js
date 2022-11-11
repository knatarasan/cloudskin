import "./App.css";
import Palette from "./components/palette/palette.component.jsx";
import Canvas from "./components/canvas/canvas.component.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container>
    <Row>
      <Col><Palette /></Col>
      <Col><Canvas /></Col>
    </Row>
    </Container>
  );
}

export default App;
