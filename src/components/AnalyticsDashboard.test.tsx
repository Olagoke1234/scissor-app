// src/components/AnalyticsDashboard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnalyticsDashboard from "./AnalyticsDashboard";

test("renders AnalyticsDashboard component", () => {
  render(<AnalyticsDashboard />);
  const headingElement = screen.getByText(/Analytics Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
