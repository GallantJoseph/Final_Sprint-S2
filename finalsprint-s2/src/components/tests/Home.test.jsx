import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

describe("Home Page Tests", () => {
  test("Renders Home page content", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check for main header
    expect(
      screen.getByText(/Welcome to Codebrew PC Building Inc/i)
    ).toBeInTheDocument();

    // Check for section titles
    expect(screen.getByText(/Premium PC Parts/i)).toBeInTheDocument();

    // Since there are multiple "Build Your PC" elements, use getAllByText
    const buildYourPCElements = screen.getAllByText(/Build Your PC/i);
    expect(buildYourPCElements.length).toBeGreaterThan(0); // Check at least one "Build Your PC" is present
  });
});
