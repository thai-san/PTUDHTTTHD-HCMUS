import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../Routes";

test("Routes mounts properly", () => {
  render(
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
  );
  expect(screen.getByText("VINA Life")).toBeInTheDocument();
});
