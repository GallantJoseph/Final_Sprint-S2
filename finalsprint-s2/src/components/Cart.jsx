import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/Cart";
import { PCBuildContext } from "../context/PCBuild";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
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

  // When the cart data changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCart = await fetch("http://localhost:5000/cart");

        if (resCart.ok) {
          const cData = await resCart.json();

          cartDataContext.setCartItems(cData);

          const resPcBuild = await fetch("http://localhost:5000/pcbuild");

          if (resPcBuild.ok) {
            const pData = await resPcBuild.json();

            pcBuildDataContext.setBuildItems(pData);
          } else {
            pcBuildDataContext.setBuildItems([]);
            throw new Error("Couldn't fetch the PC Builder data.");
          }
        } else {
          cartDataContext.setCartItems([]);
          throw new Error("Couldn't fetch the Cart data.");
        }
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (id, quantityChange) => {
    cartDataContext.setCartItems((prevCartData) =>
      prevCartData.map((item) =>
        item.id === id
          ? { ...item, id: id, quantity: item.quantity + quantityChange }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    cartDataContext.setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const updateOrder = async () => {
    const resCart = await fetch("http://localhost:5000/cart");

    if (resCart.ok) {
      const cData = await resCart.json();
    }
    console.log("Update");
  };

  return (
    <>
      <h2 className="cartheaders">Cart</h2>
      <div className="cartcontainer">
        {cartDataContext == [] ? (
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
                  <button onClick={() => handleQuantityChange(cartItem.id, -1)}>
                    -
                  </button>
                  <span className="quantityNum">{cartItem.quantity}</span>
                  <button onClick={() => handleQuantityChange(cartItem.id, 1)}>
                    +
                  </button>
                </div>

                <div className="cartprice">
                  ${productsData[cartItem.id].price.toFixed(2)}
                </div>

                <button
                  className="cartremove"
                  onClick={() => handleRemoveItem(cartItem.id)}
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
                <div className="cartpartname">{productsData[item.id].name}</div>

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
        <br />
        <Link to="/review" className="reviewbtn" onClick={updateOrder}>
          Review Your Order
        </Link>
      </div>
    </>
  );
};

export default Cart;
