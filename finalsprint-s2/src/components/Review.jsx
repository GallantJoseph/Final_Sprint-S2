import React, { useEffect, useState, useContext } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  // Calculate total cost for cart
  const cartTotal = cartDataContext.cartItems.reduce((total, item) => {
    const product = productsData[item.id - 1];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  // Calculate total cost for PC Builder
  const pcBuildTotal = pcBuildDataContext.buildItems.reduce((total, item) => {
    const product = productsData[item.id - 1];
    return product ? total + product.price : total;
  }, 0);

  const grandTotal = cartTotal + pcBuildTotal;
  const taxRate = 0.15;
  const taxAmount = grandTotal * taxRate;
  const finalTotal = grandTotal + taxAmount;

  return (
    <>
      <h2 className="cartheaders">Review Your Order</h2>

      {/* Back Button */}
      <div className="review-nav">
        <button
          className="reviewbtn"
          onClick={() => {
            navigate(-1);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        >
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
                  src={productsData[cartItem.id - 1].image}
                  alt={productsData[cartItem.id - 1].name}
                  className="cartitemimage"
                />

                <div className="cartpartname">
                  {productsData[cartItem.id - 1].name}
                </div>

                <div className="cartquantitycontrols">
                  Quantity
                  <br />
                  <span className="quantityNum">{cartItem.quantity}</span>
                </div>

                <div className="cartprice">
                  ${productsData[cartItem.id - 1].price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="total">
          <h3>Cart Total: ${cartTotal.toFixed(2)}</h3>
        </div>
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
                      src={productsData[item.id - 1].image}
                      alt={productsData[item.id - 1].name}
                      className="cartitemimage"
                    />
                    <div className="cartpartname">
                      {productsData[item.id - 1].name}
                    </div>

                    <div className="cartcategoryname">
                      {categoriesDict[productsData[item.id - 1].category]}
                    </div>

                    <div className="cartprice">
                      ${productsData[item.id - 1].price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <div className="total">
          <h3>PC Builder Total: ${pcBuildTotal.toFixed(2)}</h3>
        </div>
      </div>

      {/* Total Price */}
      <div className="backroundreview">
        <h3>Order Details</h3>

        <div className="cartcontainer receipt">
          <h3 className="receipt-title"> Receipt</h3>
          <div className="receipt-section">
            <h4> Cart Items</h4>
            {cartDataContext.cartItems.map((item) => {
              const product = productsData[item.id - 1];
              if (!product) return null;
              return (
                <div key={item.id - 1} className="receipt-row">
                  <span>
                    {product.name} x{item.quantity}
                  </span>
                  <span>${(product.price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="receipt-section">
            <h4>PC Build</h4>
            {pcBuildDataContext.buildItems.map((item, index) => {
              const product = productsData[item.id - 1];
              if (!product) return null;
              return (
                <div key={index} className="receipt-row">
                  <span>{product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="receipt-total">
            <span>Subtotal:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <div className="receipt-total">
            <span>Tax (15%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          <div className="receipt-total">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
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
              name="name"
              id="userFNameTextBox"
              placeholder="Code Brew PC"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="userPhoneTextBox">Phone:</label>
            <input
              type="text"
              name="phone"
              id="userPhoneTextBox"
              placeholder="(555) 555-5555"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="userEmailTextBox">Email:</label>
            <input
              type="text"
              name="email"
              id="userEmailTextBox"
              placeholder="support@codebrewpcbuilding.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="userAddressTextBox">Address:</label>
            <input
              type="text"
              name="address"
              id="userAddressTextBox"
              placeholder="404, Not Found"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="cityTextBox">City:</label>
            <input
              type="text"
              name="city"
              id="cityTextBox"
              placeholder="Vancouver"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="postalCodeTextBox">Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              id="postalCodeTextBox"
              placeholder="A1A 1A1"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <label htmlFor="provinceSelect">Province:</label>
            <select
              name="province"
              id="provinceSelect"
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">Select Province</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NT">Northwest Territories</option>
              <option value="NS">Nova Scotia</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
          </div>

          <h3>Credit Card</h3>

          <div id="credit-card-info">
            <div className="form-element">
              <label htmlFor="creditCardNumberTextBox">Number:</label>
              <input
                type="text"
                name="cardNumber"
                id="creditCardNumberTextBox"
                maxLength="16"
                placeholder="16 digits"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-element">
              <label htmlFor="expiryDateTextBox">Expiry Date:</label>
              <input
                type="text"
                name="expiry"
                id="expiryDateTextBox"
                maxLength="5"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
              />
            </div>

            <div className="form-element">
              <label htmlFor="cvvCodeTextBox">CVV Code:</label>
              <input
                type="text"
                name="cvv"
                id="cvvCodeTextBox"
                maxLength="4"
                placeholder="3 or 4 digits"
                value={formData.cvv}
                onChange={handleChange}
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
