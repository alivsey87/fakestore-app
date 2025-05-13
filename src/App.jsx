import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NaviBar from "./components/NaviBar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

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
