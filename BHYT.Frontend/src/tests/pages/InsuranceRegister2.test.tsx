import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InsuranceRegister2 from "../../pages/InsuranceRegister2";

test("InsuranceRegister2 mounts properly", () => {
  render(
    <MemoryRouter>
      <InsuranceRegister2 />
    </MemoryRouter>
  );
  expect(screen.getAllByText("Phiếu sức khỏe")[0]).toBeInTheDocument();
});
