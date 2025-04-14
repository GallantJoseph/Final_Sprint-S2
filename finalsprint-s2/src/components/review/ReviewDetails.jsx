import { useState } from "react";

const ReviewDetails = ({ productsData, cartData, pcBuildData }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Hard drive",
      price: 199.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
    {
      id: "2",
      name: "Case",
      price: 99.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
    {
      id: "3",
      name: "Monitor",
      price: 199.99,
      quantity: 1,
      image: "./src/assets/amd_tomas-malik-zijJwA_RtxY-unsplash.jpg",
    },
  ]);

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <section id="review-details-section">
      ReviewDetails{productsData && <>${calculateTotal().toFixed(2)}</>}
    </section>
  );
};
export default ReviewDetails;
