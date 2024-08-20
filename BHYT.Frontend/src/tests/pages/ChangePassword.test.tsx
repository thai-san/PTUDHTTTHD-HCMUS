import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChangePassword from "../../pages/ChangePassword";
import { MemoryRouter } from "react-router-dom";

test("ChangePassword mounts properly", () => {
  render(
    <MemoryRouter>
      <ChangePassword />
    </MemoryRouter>
  );
  expect(screen.getByText("Trang chủ / Quên mật khẩu")).toBeInTheDocument();
});
