import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);

  const deleteProduct = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setDeleted(true);
        setConfirm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load product details: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
        <Card className="details-card p-3 fade-up">
          <Card.Img
            className="details-image"
            src={product.image}
            alt={product.title}
          />
          <Card.Body className="details-body">
            <Card.Title className="details-title">{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{`$${parseFloat(product.price).toFixed(2)}`}</Card.Text>
            <Card.Text>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Card.Text>
            <div className="d-flex justify-content-center mt-3">
              <Button className="me-2" onClick={() => setShow(true)}>
                Add to Cart
              </Button>
              <Button variant="danger" onClick={() => setConfirm(true)}>
                Delete Product
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={confirm} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteProduct}>
            Yes
          </Button>
          <Button variant="danger" onClick={() => setConfirm(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleted} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Delete Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product ID <b>#{product?.id}</b> was successfully deleted!
        </Modal.Body>
        <Modal.Footer>
          <Button href="/products">Back to Products</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header className="m-0 p-2" closeButton></Modal.Header>
        <Modal.Body>Just a tease :D</Modal.Body>
        <Modal.Footer className="mb-2">
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetails;
