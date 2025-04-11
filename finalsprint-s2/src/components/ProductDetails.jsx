import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const genericImageUrl = "../src/assets/board-453758_640.jpg";

  // Get the productId from the url passed as a parameter
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);

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
        setProductData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>{productData.name}</h3>
      <p className="description">{productData.description}</p>
      <img
        src={productData.image !== "" ? productData.image : genericImageUrl}
        width={"200"}
      />
      <Link to={`/Products`}>Back</Link>
    </div>
  );
};
export default ProductDetails;
