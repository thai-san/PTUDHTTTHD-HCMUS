import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InsuranceRegister from "../../pages/InsuranceRegister";

test("InsuranceRegister mounts properly", () => {
  render(
    <MemoryRouter>
      <InsuranceRegister />
    </MemoryRouter>
  );
  expect(screen.getByText("Đăng ký bảo hiểm")).toBeInTheDocument();
});
