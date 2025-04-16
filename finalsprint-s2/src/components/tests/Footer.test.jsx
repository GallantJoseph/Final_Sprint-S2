// Footer.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Footer from "../Footer";
import "@testing-library/jest-dom/vitest";

describe("Footer Component", () => {
  test("renders footer text", () => {
    render(<Footer />);
    const footerText = screen.getByText(
      "© 2025 Codebrew PC Building Inc. All rights reserved."
    );
    expect(footerText).toBeInTheDocument();
  });
});
