import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Hard drive",
      price: 199.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
    {
      id: "2",
      name: "Case",
      price: 99.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
    {
      id: "3",
      name: "Monitor",
      price: 199.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
  ]);

  const [productsData, setProductsData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [pcBuildData, sePcBuildData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();

      setProductsData(products);
    };

    fetchData();
  }, []);

  const handleQuantityChange = (id, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <h2 className="cartheaders">Cart</h2>
      <div className="cartcontainer">
        {cartItems.length === 0 ? (
          <p className="emptycart">No items in your cart yet.</p>
        ) : (
          <div className="cartlist">
            {cartItems.map((item) => (
              <div key={item.id} className="cartitem">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cartitemimage"
                />

                <div className="cartpartname">{item.name}</div>

                <div className="cartquantitycontrols">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span className="quantityNum">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>

                <div className="cartprice">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="cartremove"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="cartheaders">PC Builder</h2>
      <div className="cartcontainer">
        {cartItems.length === 0 ? (
          <p className="emptycart">No items in your build.</p>
        ) : (
          <div className="cartlist">
            {cartItems.map((item) => (
              <div key={item.id} className="cartitem">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cartitemimage"
                />

                <div className="cartpartname">{item.name}</div>

                <div className="cartprice">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
        <br />
        <button className="reviewbtn">Review Your Order</button>
      </div>
    </>
  );
};

export default Cart;
