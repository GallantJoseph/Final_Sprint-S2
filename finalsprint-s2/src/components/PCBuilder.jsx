import { useEffect, useState } from "react";
import PCBuilderCategory from "./pcbuilder/PCBuilderCategory";
import "./PCBuilder.css";

const PCBuilder = () => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");

      const products = await response.json();

      setProductData(products);
    };

    fetchData();
  }, []);
  return (
    <section id="pcbuilder-section">
      <h1>PC Builder</h1>
      <PCBuilderCategory
        title="Power Supply"
        category="psu"
        data={productData}
      />
      <PCBuilderCategory title="Case" category="case" data={productData} />
      <PCBuilderCategory
        title="Motherboard"
        category="motherboard"
        data={productData}
      />
      <PCBuilderCategory title="Processor" category="cpu" data={productData} />
      <PCBuilderCategory title="Memory" category="ram" data={productData} />
      <PCBuilderCategory
        title="Storage"
        category="storage"
        data={productData}
      />
    </section>
  );
};
export default PCBuilder;
