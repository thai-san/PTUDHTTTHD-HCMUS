import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OTP from "../../pages/OTP";
import { MemoryRouter } from "react-router-dom";

test("OTP mounts properly", () => {
  render(
    <MemoryRouter>
      <OTP />
    </MemoryRouter>
  );
  expect(screen.getByText("Xác thực OTP")).toBeInTheDocument();
});
