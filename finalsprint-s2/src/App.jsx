import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import PCBuilder from "./components/PCBuilder";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Review from "./components/Review";
import ProductDetails from "./components/ProductDetails";

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
        <Route path="/ProductDetails" element={<ProductDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
