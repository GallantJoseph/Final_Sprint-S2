import { useEffect, useState, useContext } from "react";
import { PCBuildContext } from "../../context/PCBuild";
import "./PCBuilderCategory.css";

const PCBuilderCategory = ({ title, category, data, onClick }) => {
  const genericImageUrl = "../src/assets/board-453758_640.jpg";
  const [productsData, setProductsData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const pcBuild = useContext(PCBuildContext);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:5000/cart");
      const cartData = await res.json();
      setCart(cartData);
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (data) {
      setProductsData(data.filter((item) => item.category === category));
    }
  }, [data, category]);

  const getAvailableStock = (productId, quantity_on_hand) => {
    const cartItem = cart.find((item) => item.id === productId);
    return quantity_on_hand - (cartItem?.quantity || 0);
  };

  const updateProductStock = async (product) => {
    const updatedQuantity = product.quantity_on_hand - 1;

    const updatedProduct = { ...product, quantity_on_hand: updatedQuantity };

    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    // Optional: update local state
    setProductsData((prev) =>
      prev.map((p) => (p.id === product.id ? updatedProduct : p))
    );
  };

  const handleSelect = async (product) => {
    const available = getAvailableStock(product.id, product.quantity_on_hand);

    if (available > 0) {
      await updateProductStock(product); // ✅ update json file via server
      setSelectedProduct(product);
      onClick(product);
    }
  };

  return (
    <div className="product-category">
      <h2>{title}</h2>
      <div className="products">
        {productsData &&
          productsData.map((product, index) => {
            const available = getAvailableStock(
              product.id,
              product.quantity_on_hand
            );

            return (
              <li key={index}>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>

                <img
                  src={product.image !== "" ? product.image : genericImageUrl}
                  width={"100%"}
                  alt={product.name}
                />

                <p className="stock">
                  {available > 0 ? (
                    <span className="instock">In Stock: {available}</span>
                  ) : (
                    <span className="outofstock">Out of Stock</span>
                  )}
                </p>

                <p className="price">
                  $ {product.price}
                  <br />
                  <button
                    onClick={() => handleSelect(product)}
                    className={`selectbutton ${
                      selectedProduct?.id === product.id ? "selected" : ""
                    }`}
                    disabled={available === 0}
                  >
                    {selectedProduct?.id === product.id && (
                      <span className="checkmark">✔</span>
                    )}
                    Select
                  </button>
                </p>
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default PCBuilderCategory;
