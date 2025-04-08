import { useEffect, useState } from "react";

const PCBuilderCategory = ({ title, category, data, onClick }) => {
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
              {d.description}
              <br />
              <img src={d.image} width={"100%"} />
              <br />
              {d.price} <br />
              <button key={index} onClick={onClick}>
                Select
              </button>
            </li>
          ))}
      </div>
    </div>
  );
};
export default PCBuilderCategory;
