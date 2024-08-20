import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("App mounts properly", () => {
  render(<App />);
  expect(screen.getByText("Trang chủ")).toBeInTheDocument();
});
