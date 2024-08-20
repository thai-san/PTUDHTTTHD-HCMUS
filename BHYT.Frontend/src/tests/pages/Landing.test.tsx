import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../../pages/Landing";

test("Landing mounts properly", () => {
  render(<Landing />);
  expect(screen.getByText("VINA Life")).toBeInTheDocument();
});
