import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddProduct() {
  const [product, setProduct] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      setProduct(response.data);
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError(`Error submitting form. Please try again: ${err.message}`);
      setSubmitted(false);
    }
  };

  return (
    <>
      <Container>
        <h2>Add Product</h2>

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
        show={submitted}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Addition Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product <b>{formData.title}</b> was successfully added!
        </Modal.Body>
        <Modal.Footer>
          <Button href="/products">Back to Products</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
