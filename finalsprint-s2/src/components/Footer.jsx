import React from "react";
import BackToTopButton from "./BackToTopButton";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerbacktotop">
        <BackToTopButton />
      </div>
      <p>© 2025 Codebrew PC Building Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
