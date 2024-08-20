import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InsuranceForm2 from "../../components/InsuranceForm2";

test("InsuranceForm2 mounts properly", () => {
  render(
    <MemoryRouter>
      <InsuranceForm2 />
    </MemoryRouter>
  );
  expect(screen.getByText("Tiền sử bản thân:")).toBeInTheDocument();
});
