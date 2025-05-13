
# Fake Store App

---
---

### Fake Store App using the [Fake Store API](https://fakestoreapi.com/) API

---
---

## TABLE OF CONTENTS

1. [App](#1-app)

2. [Home Page](#2-home-page)

3. [Navigation Bar](#3-navigation-bar)

4. [Products](#4-products)

5. [Product Details](#5-product-details)

6. [Delete Product](#delete-product)

7. [Edit Product](#6-edit-product)

8. [Add Product](#8-add-product)

9. [CSS Styling](#9-css-styling)

---
---

## 1. App

The main parent component using `BrowserRouter` and `Router` to contain all the Routes leading to the [HomePage](#2-home-page), [Products](#4-products), [ProductDetails](#5-product-details), [AddProduct](#8-add-product) and [EditProduct](#7-edit-product) components. This also includes the [Navigation Bar](#3-navigation-bar) component:

```js
function App() {
  return (
    <>
      
      <Router>
        <NaviBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id/edit-product" element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

---
---

## 2. Home Page

The `HomePage` component that includes a simple welcome message, brief overview of the site and a button to navigate straight to the [Products](#4-products). This is the landing page:

```js
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
```

---
---

## 3. Navigation Bar

The `NavBar` bootstrap component that is present throughout the entire site. Uses `NavLink` from `react-router-dom` to point links to the appropriate component routes:

```js
function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="p-3 mb-4" sticky="top">
      <Navbar.Brand href="/">Fake Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" activeclassname="active">
            Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
            Add Product
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
```

---
---

## 4. Products

This is the main attraction. `Axios` is used to fetch data from the Fake Store API and render all the products in this component:

```js
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
                  <Button href={`/products/${product.id}/edit-product`}>
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
```

A `loading` state variable is used for conditionally rendering a "Loading..." message or the actual product cards. Upon successful response from the `GET` HTTP request, the state variable `products` is mapped over and a `Card` component is created for each product. Each card has a button that navigates to [Product Details](#5-product-details) and a button that navigates to [Edit Product](#7-edit-product).

---
---

## 5. Product Details

This is where the user can view more details, which includes the category and a description of the product:

```js
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
  );
}
```

Once again, `axios` is used to fetch data from the API, this time utilizing the specific product `id` variable obtained from `useParams` to display info from that individual product. Along with the details, there is an "Add to Cart" button, which doesn't actually add to cart but instead renders a modal, and a
#### Delete Product

 button. The "Delete Product" button will trigger a modal asking for confirmation. If the user selects "Yes", a `DELETE` request is sent to the API via `axios` and another modal comes up. These are the modals in use:

```js
      <>
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
```

The first two add to the functionality of the app and so have a `backdrop="static"` to force the user to choose only the options that yield a certain "flow" of operation. The first modal can actually trigger the `DELETE` request to the API, and the second modal confirms this deletion and "directs" the user by providing a single option to navigate back to the [Products](#4-products) page.

---
---

## 7. Edit Product

This component allows the user to "edit" a product and send a `PUT` request to the API:

```js
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
        <h2 className="fade-down">Edit Product</h2>

        <Form className="fade-up" onSubmit={handleSubmit}>
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

          <Button className="mt-3" variant="primary" type="submit">
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
```

Just like the [Product Details](#5-product-details) component, this uses `useParams` to request the individual product details in order to pre-fill the fields for the user. The `handleChange()` function dynamically updates the data stored in the `formData` state variable. When the user submits, this triggers the `handleSubmit()` function which sends a `PUT` request to the API with the `formData`. All fields are required in the form. Upon successful submission, a modal is rendered confirming the successful update and a redirect button back to the [Products](#4-products) page. This modal behaves similarly to the deletion confirmation modal in [Product Details](#5-product-details).

---
---

## 8. Add Product

Component where user can create a product to add:

```js
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
        <h2 className="fade-down">Add Product</h2>

        <Form className="fade-up" onSubmit={handleSubmit}>
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

          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
```

Similar to [Edit Product](#7-edit-product), this component dynamically updates the `formData` via the `handleChange()` function, and this time a `POST` request is sent with the `formData` info to the API when `handleSubmit()` is triggered. Both components use the `.preventDefault()` function during submission to bypass the browser's default behavior for form submission. This component also uses a modal that is very similar to the [Edit Product](#7-edit-product) modal used for submission confirmation and redirecting back to products.

---
---

## 9. CSS Styling

Bootstrap styling is used throughout the App. I included custom classes to add more styling with these properties such as:

```css
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
```
and
```css
animation: fadeIn 1s ease-out forwards;
```

I did override the modal bootstrap class and provided my own styling, which not only changed the look of the modal but the animation of a static modal when trying to click outside:

```css
.modal-content {
  background-color: rgba(0, 0, 0, 0.8) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  backdrop-filter: blur(8px) !important;
  color: #ffffff !important;
  text-align: center !important;
  border-radius: 10px !important;
  border: none !important;
  box-shadow: 0 2px 8px #000000;
}
.modal-static .modal-dialog {
  animation: shake 200ms linear !important;
}
```

I thought a back-and-forth "head shake" animation better communicated to the user that they can only select an option from the modal to close.

[back to top](#fake-store-app)
