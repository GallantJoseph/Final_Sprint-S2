import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../App.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShopNow = () => {
    navigate("/Products"); // Navigate to the Products page when button is clicked
  };
  const handleBuildNow = () => {
    navigate("/PCBuilder");
  };
  const handleMeetStaff = () => {
    navigate("/Contact");
  };
  return (
    <div className="homecontainer">
      <header className="homesection">
        <h1>Welcome to Codebrew PC Building Inc.</h1>
        <p>We've been building PCs one byte at a time since 2025!</p>
        <button className="shopbutton" onClick={handleBuildNow}>
          Shop Now
        </button>
      </header>

      <section className="pcparts">
        <h2>Premium PC Parts</h2>
        <p>
          We offer the latest and best PC parts for gamers, streamers, and
          professionals. Choose from a wide selection of graphics cards,
          processors, memory, and more!
        </p>
        <button className="shopbutton" onClick={handleShopNow}>
          Browse PC Parts
        </button>
      </section>

      <section className="pcparts">
        <h2>Build Your PC</h2>
        <p>
          Whether you want to build your own PC or have us build it for you, we
          offer a seamless process to get your dream machine up and running.
          Choose your components and we'll take care of the rest, or pick a DIY
          kit and build it yourself!
        </p>
        <button className="shopbutton" onClick={handleBuildNow}>
          Build Your PC
        </button>
      </section>
    </div>
  );
};

export default Home;
