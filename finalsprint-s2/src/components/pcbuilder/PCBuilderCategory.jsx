import { useEffect, useState } from "react";
import "./PCBuilderCategory.css";

const PCBuilderCategory = ({ title, category, data, onClick }) => {
  const genericImageUrl = "../src/assets/board-453758_640.jpg";
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    const filterData = async () => {
      if (data) {
        setProductsData(data.filter((d) => d.category === category));
      }
    };

    filterData();
  }, [data]);
  return (
    <div className="product-category">
      <h2>{title}</h2>
      <div className="products">
        {productsData &&
          productsData.map((d, index) => (
            <li key={index}>
              <h3>{d.name}</h3>
              <p className="description">{d.description}</p>
              <br />
              <img
                src={d.image !== "" ? d.image : genericImageUrl}
                width={"100%"}
              />

              <p className="price">
                $ {d.price}
                <br />
                <button key={index} onClick={onClick}>
                  Select
                </button>
              </p>
            </li>
          ))}
      </div>
    </div>
  );
};
export default PCBuilderCategory;
