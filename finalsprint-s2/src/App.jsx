/*
  Description: Final Sprint - Semester 2 - Codebrew PC Building Inc.
  Authors:  -Joseph Gallant
            -Justin Greenslade
            -Ashton Dennis
  Dates: April 7, 2025 - April 16, 2025
*/

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import PCBuilder from "./components/PCBuilder";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Review from "./components/Review";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/PCBuilder" element={<PCBuilder />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Review" element={<Review />}></Route>
        <Route
          path="/ProductDetails/:productId"
          element={<ProductDetails />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
