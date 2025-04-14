import React, { useEffect, useState, useContext } from "react";
import ReviewDetails from "./review/ReviewDetails";
import { useNavigate } from "react-router-dom";
import { PCBuildContext } from "../context/PCBuild";
import { CartContext } from "../context/Cart";
import "./Cart.css";

const Review = () => {
  // Categories dictionary for the PC Build
  const categoriesDict = {
    psu: "Power Supply",
    case: "Case",
    motherboard: "Motherboard",
    cpu: "Processor",
    gpu: "Graphics Card",
    ram: "Memory",
    storage: "Storage",
  };

  const [productsData, setProductsData] = useState([]);
  const cartDataContext = useContext(CartContext);
  const pcBuildDataContext = useContext(PCBuildContext);

  const navigate = useNavigate();

  // Scroll to the top of the page when the component is loaded for the first time
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch data on first load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await fetch("http://localhost:5000/products");

        if (resProducts.ok) {
          const pData = await resProducts.json();

          setProductsData(pData);
        } else {
          throw new Error("Couldn't fetch the Products data.");
        }
      } catch (err) {
        setProductsData([]);
        alert(err);
      }
    };

    fetchData();
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
        {cartDataContext == [] || productsData.length === 0 ? (
          <p className="emptycart">No items in your cart yet.</p>
        ) : (
          <div className="cartlist">
            {cartDataContext.cartItems.map((cartItem) => (
              <div key={cartItem.id} className="cartitem">
                <img
                  src={productsData[cartItem.id].image}
                  alt={productsData[cartItem.id].name}
                  className="cartitemimage"
                />

                <div className="cartpartname">
                  {productsData[cartItem.id].name}
                </div>

                <div className="cartquantitycontrols">
                  Quantity
                  <br />
                  <span className="quantityNum">{cartItem.quantity}</span>
                </div>

                <div className="cartprice">
                  ${productsData[cartItem.id].price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="cartheaders">PC Builder</h2>
      {/* Cart Items */}
      <div className="cartcontainer">
        {productsData.length > 0 && (
          <>
            {pcBuildDataContext.buildItems == [] ? (
              <p className="emptycart">No items in your build.</p>
            ) : (
              <div className="cartlist">
                {pcBuildDataContext.buildItems.map((item, index) => (
                  <div key={index} className="cartitem">
                    <img
                      src={productsData[item.id].image}
                      alt={productsData[item.id].name}
                      className="cartitemimage"
                    />
                    <div className="cartpartname">
                      {productsData[item.id].name}
                    </div>

                    <div className="cartcategoryname">
                      {categoriesDict[productsData[item.id].category]}
                    </div>

                    <div className="cartprice">
                      ${productsData[item.id].price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {/* Total Price */}
      <div className="backroundreview">
        <h3>Order Details</h3>
        <div className="cartcontainer">
          <ReviewDetails
            productsData={productsData}
            cartData={cartDataContext.cartItems}
            pcBuildData={pcBuildDataContext.buildItems}
          />
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
