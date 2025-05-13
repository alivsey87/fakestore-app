import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Welcome to the Fake Store App!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button href="/products">Product Listings</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
