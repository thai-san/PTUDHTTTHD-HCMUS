import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InsuranceForm1 from "../../components/InsuranceForm1";

test("InsuranceForm1 mounts properly", () => {
  render(
    <MemoryRouter>
      <InsuranceForm1 />
    </MemoryRouter>
  );
  expect(screen.getByText("Thông tin cá nhân")).toBeInTheDocument();
});
