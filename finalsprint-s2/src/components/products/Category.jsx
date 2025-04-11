import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ type }) {
  const [filtData, setFiltData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();

      if (type === "all") {
        setFiltData(data);
      } else {
        setFiltData(
          data.filter((element) => {
            return element.category === type;
          })
        );
      }
    }

    getData();
  }, [type]);

  const handleAddToCart = (id) => {
    // logic for adding to cart (can be enhanced)
    console.log(`Product ${id} added to cart`);
  };

  return filtData.map((obj) => (
    <div key={obj.id} className="productcard">
      <img className="productimage" src={obj.image} alt={obj.name} />
      <div className="productinfo">
        <h3 className="productname">{obj.name}</h3>
        <p className="productdescription">{obj.description}</p>
        <p className="productprice">${obj.price.toFixed(2)}</p>
        {obj.quantity_on_hand === 0 ? "Out of Stock" : "Available"}
        <Link to={`/ProductDetails/${obj.id}`}>Product Details</Link>
        <button
          className="addtocartbtn"
          onClick={() => handleAddToCart(obj.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));
}

export default Category;
