import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        formData
      );
      setProduct(response.data);
      setUpdated(true);
      setShow(true);
      setError(null);
    } catch (err) {
      setError(`Error submitting form. Please try again: ${err.message}`);
      setUpdated(false);
    }
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load product: ${error.message}`);
        setLoading(false);
      });
  }, [id]);


  if (loading) return <p>Loading details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
        <h2>Edit Product</h2>

        {error && (
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a category..."
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a price..."
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an image URL..."
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Update Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product ID #{product.id} was successfully updated!
        </Modal.Body>
        <Modal.Footer>
          <Button href="/products">Back to Products</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;
