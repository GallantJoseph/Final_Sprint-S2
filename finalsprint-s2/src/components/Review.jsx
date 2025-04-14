import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Review = () => {
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

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const navigate = useNavigate();

  // Scroll to the top of the page when the component is loaded for the first time
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <h2 className="cartheaders">Review Your Order</h2>

      {/* Back Button */}
      <div className="review-nav">
        <button className="reviewbtn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <h2 className="cartheaders">Cart</h2>
      {/* Cart Items */}
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
                <div className="cartquantity">Quantity: {item.quantity}</div>
                <div className="cartprice">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="cartheaders">PC Builder</h2>
      {/* Cart Items */}
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
                <div className="cartquantity">Quantity: {item.quantity}</div>
                <div className="cartprice">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Total Price */}
      <div className="backroundreview">
        <h3>Order Details</h3>
        <div className="cartcontainer">
          <div className="total-amount">${calculateTotal().toFixed(2)}</div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="backroundreview">
        <h3>Payment Details</h3>

        <form id="orderForm">
          <div className="form-element">
            <label htmlFor="userFNameTextBox">Name:</label>
            <input
              type="text"
              name="userFNameTextBox"
              id="userFNameTextBox"
              placeholder="Code Brew PC"
            />
          </div>
          <div className="form-element">
            <label htmlFor="userPhoneTextBox">Phone:</label>
            <input
              type="text"
              name="userPhoneTextBox"
              id="userPhoneTextBox"
              placeholder="(555) 555-5555"
            />
          </div>
          <div className="form-element">
            <label htmlFor="userEmailTextBox">Email:</label>
            <input
              type="text"
              name="userEmailTextBox"
              id="userEmailTextBox"
              placeholder="support@codebrewpcbuilding.com"
            />
          </div>
          <div className="form-element">
            <label htmlFor="userAddressTextBox">Address:</label>
            <input
              type="text"
              name="userAddressTextBox"
              id="userAddressTextBox"
              placeholder="404, Not Found"
            />
          </div>

          <h3>Credit Card</h3>

          <div id="credit-card-info">
            <div className="form-element">
              <label htmlFor="creditCardNumberTextBox">Number:</label>
              <input
                type="text"
                name="creditCardNumberTextBox"
                id="creditCardNumberTextBox"
                maxLength="16"
                placeholder="16 digits"
              />
            </div>
            <div className="form-element">
              <label htmlFor="expiryDateTextBox">Expiry Date:</label>
              <input
                type="text"
                name="expiryDateTextBox"
                id="expiryDateTextBox"
                maxLength="5"
                placeholder="MM/YY"
              />
            </div>
            <div className="form-element">
              <label htmlFor="cvvCodeTextBox">CVV Code:</label>
              <input
                type="text"
                name="cvvCodeTextBox"
                id="cvvCodeTextBox"
                maxLength="4"
                placeholder="3 or 4 digits"
              />
            </div>
          </div>
        </form>
        {/* Checkout Button */}
        <div className="checkout-section">
          <button
            className="reviewbtn"
            onClick={() => {
              alert("Order is on the way");
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Review;
