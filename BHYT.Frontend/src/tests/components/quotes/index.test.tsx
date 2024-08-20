import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Quotes from "../../../components/quotes";

test("Quotes mounts properly", () => {
  render(<Quotes />);
  expect(screen.getByText("VINA Life- Vững vàng")).toBeInTheDocument();
});
