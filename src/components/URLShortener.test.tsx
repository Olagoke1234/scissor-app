import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import URLShortener from "./URLShortener"; // Ensure this path is correct

test("renders URLShortener component", () => {
  render(<URLShortener />);
  expect(screen.getByPlaceholderText("Enter URL")).toBeInTheDocument();
});
