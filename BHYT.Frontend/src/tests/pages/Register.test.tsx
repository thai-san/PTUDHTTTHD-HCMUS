import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "../../pages/Register";

test("Register mounts properly", () => {
  render(<Register />);
  expect(screen.getByText("Trang chủ / Đăng ký")).toBeInTheDocument();
});
