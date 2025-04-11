// components/BackToTopButton.jsx
import React from "react";
import "./BackToTopButton.css";
const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className="backtotopbutton" onClick={scrollToTop}>
      ↑ Back to Top
    </button>
  );
};

export default BackToTopButton;
