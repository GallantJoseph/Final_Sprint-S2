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
        setFiltData(data.filter((element) => element.category === type));
      }
    }

    getData();
  }, [type]);

  const handleAddToCart = (id) => {
    console.log(`Product ${id} added to cart`);
  };

  if (type !== "all") {
    return (
      <>
        <h2 className="categorytitle">{type.toUpperCase()}</h2>
        {filtData.map((obj) => (
          <div key={obj.id} className="productcard">
            <img className="productimage" src={obj.image} alt={obj.name} />
            <div className="productinfo">
              <h3 className="productname">{obj.name}</h3>
              <p className="productdescription">{obj.description}</p>
              <p className="productprice">${obj.price.toFixed(2)}</p>
              <p>
                {obj.quantity_on_hand === 0 ? (
                  <span className="outofstock">Out of Stock</span>
                ) : (
                  <span className="instock">Available</span>
                )}
              </p>
              <Link to={`/ProductDetails/${obj.id}`}>Product Details</Link>
              {obj.quantity_on_hand === 0 ? (
                <button className="addtocartdisabledbtn" disabled={true}>
                  X
                </button>
              ) : (
                <button
                  className="addtocartbtn"
                  onClick={() => handleAddToCart(obj.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  // For "all" categories
  const categories = [...new Set(filtData.map((item) => item.category))];

  return (
    <>
      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="categorytitle">{cat.toUpperCase()}</h2>
          {filtData
            .filter((item) => item.category === cat)
            .map((obj) => (
              <div key={obj.id} className="productcard">
                <img className="productimage" src={obj.image} alt={obj.name} />
                <div className="productinfo">
                  <h3 className="productname">{obj.name}</h3>
                  <p className="productdescription">{obj.description}</p>
                  <p className="productprice">${obj.price.toFixed(2)}</p>
                  <p>
                    {obj.quantity_on_hand === 0 ? (
                      <span className="outofstock">Out of Stock</span>
                    ) : (
                      <span className="instock">Available</span>
                    )}
                  </p>
                  <Link to={`/ProductDetails/${obj.id}`}>Product Details</Link>
                  {obj.quantity_on_hand === 0 ? (
                    <button className="addtocartdisabledbtn" disabled={true}>
                      X
                    </button>
                  ) : (
                    <button
                      className="addtocartbtn"
                      onClick={() => handleAddToCart(obj.id)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      ))}
    </>
  );
}

export default Category;
