import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Scissor app header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Scissor - URL Shortener/i);
  expect(headerElement).toBeInTheDocument();
});
