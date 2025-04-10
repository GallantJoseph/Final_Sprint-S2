import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
  // Temp Fake data
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Hard drive",
      price: 199.99,
      quantity: 1,
    },
    {
      id: "2",
      name: "case",
      price: 99.99,
      quantity: 1,
    },
    {
      id: "3",
      name: "Monitor",
      price: 199.99,
      quantity: 1,
    },
  ]);

  // Handle quantity change for the item
  const handleQuantityChange = (id, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
          : item
      )
    );
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <h2>Your Cart</h2>
      <div className="cartcontainer">
        {cartItems.length === 0 ? (
          <p className="emptycart">No items in your cart yet.</p>
        ) : (
          <div className="cartlist">
            {cartItems.map((item) => (
              <div key={item.id} className="cartitem">
                <div className="cartpartname">{item.name}</div>

                <div className="cartquantitycontrols">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
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
    </>
  );
};

export default Cart;
