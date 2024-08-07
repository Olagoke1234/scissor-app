// src/components/QRCodeGenerator.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QRCodeGenerator from "./QRCodeGenerator";

test("renders QRCodeGenerator component", () => {
  render(<QRCodeGenerator url="http://example.com" />);
  const qrCodeElement = screen.getByAltText(/QR Code/i);
  expect(qrCodeElement).toBeInTheDocument();
});
