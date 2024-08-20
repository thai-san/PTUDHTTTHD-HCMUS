import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Banner from "../../../components/Banner";

test("Banner mounts properly", () => {
  render(<Banner />);
  expect(screen.getByText("VINA Life")).toBeInTheDocument();
});
