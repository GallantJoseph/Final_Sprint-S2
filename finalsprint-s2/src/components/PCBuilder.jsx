import { useEffect, useState } from "react";

const PCBuilder = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");

      const products = await response.json();

      setProductData(products);
      console.dir(products);
    };

    fetchData();
  }, []);
  return <div>PCBuilder</div>;
};
export default PCBuilder;
