import React from "react";
import Navigation from "../Navigation";
import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

describe("Navigation Section Tests", () => {
  test("Renders Navigation Bar Properly", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const homeElement = screen.getByText("Home");
    expect(homeElement).toBeInTheDocument();
  });
});
