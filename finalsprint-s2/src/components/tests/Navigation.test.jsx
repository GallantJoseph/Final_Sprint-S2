import React from "react";
import Navigation from "../Navigation";
import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("Navigation Section Tests", () => {
  test("Renders Navigation Bar Properly", () => {
    render(<Navigation />);
    const homeElement = screen.getByText("Home");
    expect(homeElement).toBeInTheDocument();

    const txtElement2 = screen.getByText("Hello");
    expect(txtElement2).toBeInTheDocument();
  });
});
