import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="mt-5 fade-down">
          <h1 className="mt-5">Welcome to the Fake Store</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5 fade-down">
          <h4>You can't buy, but you can certainly <b>see</b> our products!</h4>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5 fade-up">
          <Button href="/products">Products</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
