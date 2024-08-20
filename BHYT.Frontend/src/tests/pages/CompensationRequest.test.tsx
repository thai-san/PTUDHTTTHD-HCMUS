import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompensationRequest from "../../pages/CompensationRequest";
import { MemoryRouter } from "react-router-dom";

test("CompensationRequest mounts properly", () => {
  render(
    <MemoryRouter>
      <CompensationRequest />
    </MemoryRouter>
  );
  expect(screen.getByText("Yêu cầu chi trả")).toBeInTheDocument();
});
