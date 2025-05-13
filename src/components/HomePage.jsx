import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <Container className="mt-5 fade-down">
      <Row>
        <Col className="mt-5">
          <h1 className="mt-5">Welcome to the Fake Store App!</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          <Button href="/products">Products</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
