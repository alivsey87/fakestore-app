import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to retrieve products: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <p className="mt-5">Loading...</p> <Spinner />
      </>
    );
  if (error) return <p>{error}</p>;

  return (
    <Container className="py-5">
      <h2 className="fade-down">Our Products</h2>
      <Row className="ms-auto justify-content-center">
        {products.map((product) => (
          <Col key={product.id} md={6} lg={4} className="mt-4 fade-up">
            <Card style={{ width: "18rem" }} className="mb-4 p-4 product-card">
              <Card.Img
                src={product.image}
                alt={product.title}
                className="product-image"
              ></Card.Img>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">
                  {product.title}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{`$${parseFloat(
                  product.price
                ).toFixed(2)}`}</Card.Subtitle>
                <div className="mt-auto">
                  <Button href={`/products/${product.id}`} className="me-2">
                    View Details
                  </Button>
                  <Button href={`/products/${product.id}/edit_product`}>
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
