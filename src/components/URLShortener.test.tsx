// src/components/URLShortener.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import URLShortener from "./URLShortener";

test("renders URLShortener component", () => {
  render(<URLShortener />);
  const inputElement = screen.getByPlaceholderText(/Enter URL/i);
  expect(inputElement).toBeInTheDocument();
  const buttonElement = screen.getByText(/Shorten URL/i);
  expect(buttonElement).toBeInTheDocument();
});

test("shortens URL on button click", () => {
  render(<URLShortener />);
  const inputElement = screen.getByPlaceholderText(/Enter URL/i);
  const buttonElement = screen.getByText(/Shorten URL/i);
  fireEvent.change(inputElement, { target: { value: "http://example.com" } });
  fireEvent.click(buttonElement);
  // Add additional checks based on the functionality implemented in the handleShorten method
});
