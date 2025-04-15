import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const genericImageUrl = "../src/assets/board-453758_640.jpg";

  // Get the productId from the url passed as a parameter
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [cart, setCart] = useState([]);
  const [addedToCartIds, setAddedToCartIds] = useState([]); // Track products added to the cart

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${productId}`
        );

        if (response.status === 404) {
          throw new Error("Invalid productID input.");
        } else {
          const products = await response.json();
          setProductData(products);
        }
      } catch (error) {
        console.log(error);
        setProductData({});
      }

      const cartRes = await fetch("http://localhost:5000/cart");
      const cartDat = await cartRes.json();
      setCart(cartDat);
      setAddedToCartIds(cartDat.map((item) => item.id)); // Initialize addedToCartIds with cart items
    };

    fetchData();
  }, [productId]);

  async function fetchItem(id) {
    const res = await fetch(`http://localhost:5000/cart/${id}`);
    const dat = await res.json();
    return dat;
  }

  async function handleAddToCart(productId) {
    let found = false;
    for (const element of cart) {
      if (element.id === productId) {
        found = true;
      }
    }

    if (found) {
      const recarted = await fetchItem(productId);
      const foundResp = await fetch(`http://localhost:5000/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...recarted, quantity: recarted.quantity + 1 }),
      });

      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...recarted, quantity: recarted.quantity + 1 }
            : item
        )
      );
      setAddedToCartIds((prevIds) => [...prevIds, productId]); // Add the product to the added list
    } else {
      const resp = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: productId, quantity: 1 }),
      });

      const data = await resp.json();

      setCart([...cart, data]);
      setAddedToCartIds((prevIds) => [...prevIds, productId]); // Add the product to the added list
    }
  }

  // Render the "Add to Cart" button or the checkmark based on if it's in the cart
  const renderAddToCartButton = (obj) => {
    if (obj.quantity_on_hand === 0) {
      return (
        <button className="addtocartdisabledbtn" disabled={true}>
          X
        </button>
      );
    } else if (addedToCartIds.includes(obj.id)) {
      return (
        <button className="addtocartbtn added" disabled>
          ✔️ Added
        </button>
      );
    } else {
      return (
        <button
          className="addtocartbtn"
          onClick={() => handleAddToCart(obj.id)}
        >
          Add to Cart
        </button>
      );
    }
  };

  return (
    <div className="product">
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>{productData.name}</h3>
      <p className="description">{productData.description}</p>
      <img
        src={productData.image !== "" ? productData.image : genericImageUrl}
        width={"200"}
        alt={productData.name}
      />
      <p>Quantity on hand: {productData.quantity_on_hand}</p>
      {renderAddToCartButton(productData)}
    </div>
  );
};

export default ProductDetails;
