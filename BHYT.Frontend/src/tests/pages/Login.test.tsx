import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Login from "../../pages/Login";

test("Login mounts properly", () => {
  render(
    <HashRouter>
      <Login />
    </HashRouter>
  );
  expect(screen.getByText("Trang chủ / Đăng nhập")).toBeInTheDocument();
});
