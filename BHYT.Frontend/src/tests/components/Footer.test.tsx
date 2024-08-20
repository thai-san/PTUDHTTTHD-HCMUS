import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

test("Footer mounts properly", () => {
  render(<Footer />);
  expect(screen.getByText("Về chúng tôi")).toBeInTheDocument();
});
