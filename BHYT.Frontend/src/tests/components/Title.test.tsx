import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "../../components/Title";

test("Title mounts properly", () => {
  render(<Title title="Bảo Hiểm Y Tế" path="/" />);
  expect(screen.getByText("Bảo Hiểm Y Tế")).toBeInTheDocument();
});
