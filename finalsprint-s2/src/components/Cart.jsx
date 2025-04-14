import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [cartData, setCartData] = useState([]);
  const [pcBuildData, setPcBuildData] = useState([]);

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
        alert(err);
      }
    };

    fetchData();
  }, []);

  // When the cart data changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCart = await fetch("http://localhost:5000/cart");

        if (resCart.ok) {
          const cData = await resCart.json();

          setCartData(cData);
          console.log("cart fetched");

          const resPcBuild = await fetch("http://localhost:5000/pcbuild");

          if (resPcBuild.ok) {
            const pData = await resPcBuild.json();

            setPcBuildData(pData);
            console.log("pc build fetched");
          } else {
            throw new Error("Couldn't fetch the PC Builder data.");
          }
        } else {
          throw new Error("Couldn't fetch the Cart data.");
        }
      } catch (err) {
        alert(err);
      }
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
          /*<div className="cartlist">
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
          </div> */
          <div className="cartlist">
            {pcBuildData.map((item, index) => (
              <div key={index} className="cartitem">
                <img
                  src={productsData[item.id].image}
                  alt={productsData[item.id].name}
                  className="cartitemimage"
                />
                <div className="cartpartname">{productsData[item.id].name}</div>

                <div className="cartprice">
                  {categoriesDict[productsData[item.id].category]}
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
        <Link to="/Review" className="reviewbtn">
          Review Your Order
        </Link>
      </div>
    </>
  );
};

export default Cart;
