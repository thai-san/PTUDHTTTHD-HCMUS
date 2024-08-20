import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InsurancePolicies from "../../../components/Profile/InsurancePolicies";
import { MemoryRouter } from "react-router-dom";

test("InsurancePolicies mounts properly", () => {
  render(
    <MemoryRouter>
      <InsurancePolicies />
    </MemoryRouter>
  );
  expect(screen.getByRole("grid")).toBeInTheDocument();
});
