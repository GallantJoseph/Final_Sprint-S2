import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Cart";
import { PCBuildContext } from "../context/PCBuild";
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

  // useState and useContext variables
  const [productsData, setProductsData] = useState([]);
  const cartDataContext = useContext(CartContext);
  const pcBuildDataContext = useContext(PCBuildContext);

  // Fetch data on first load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await fetch("http://localhost:5000/products");

        if (resProducts.ok) {
          const pData = await resProducts.json();

          setProductsData(pData);

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

  const handleQuantityChange = async (id, quantityChange) => {
    // Update the cart quantity data in the json
    let updCartItem = cartDataContext.cartItems.filter(
      (item) => item.id === id
    )[0];

    if (updCartItem.quantity + quantityChange > 0) {
      updCartItem = {
        ...updCartItem,
        quantity: updCartItem.quantity + quantityChange,
      };

      const res = await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updCartItem),
      });

      // Update the useContext variable
      cartDataContext.setCartItems((prevCartData) =>
        prevCartData.map((item) =>
          item.id === id
            ? { ...item, id: id, quantity: item.quantity + quantityChange }
            : item
        )
      );
    } else if (updCartItem.quantity + quantityChange === 0) {
      handleRemoveItem(id);
    }
  };

  const handleRemoveItem = async (id) => {
    // Remove the cart item in the json
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    });

    // Remove the item from the useContext variable
    cartDataContext.setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Calculate total cost for cart
  const cartTotal = cartDataContext.cartItems.reduce((total, item) => {
    const product = productsData[item.id];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  // Calculate total cost for PC Builder
  const pcBuildTotal = pcBuildDataContext.buildItems.reduce((total, item) => {
    const product = productsData[item.id];
    return product ? total + product.price : total;
  }, 0);

  const grandTotal = cartTotal + pcBuildTotal;

  return (
    <>
      <h2 className="cartheaders">Cart</h2>
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
                  <button onClick={() => handleQuantityChange(cartItem.id, -1)}>
                    -
                  </button>
                  <span className="quantityNum">{cartItem.quantity}</span>
                  <button onClick={() => handleQuantityChange(cartItem.id, 1)}>
                    +
                  </button>
                </div>

                <div className="cartprice">
                  ${productsData[cartItem.id - 1].price.toFixed(2)}
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
        <div className="totalcost">
          <h3 className="total">Cart Total: ${cartTotal.toFixed(2)}</h3>
        </div>
      </div>

      <h2 className="cartheaders">PC Builder</h2>
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

      <div className="cartcontainer">
        <div className="total">
          <h3>Subtotal: ${grandTotal.toFixed(2)}</h3>
        </div>

        <Link to="/Review" className="reviewbtn">
          Review Your Order
        </Link>
      </div>
    </>
  );
};

export default Cart;
