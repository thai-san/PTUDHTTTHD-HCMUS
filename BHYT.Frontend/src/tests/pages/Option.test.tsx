import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Option from "../../pages/Option";

test("Option mounts properly", () => {
  render(
    <MemoryRouter>
      <Option />
    </MemoryRouter>
  );
  expect(screen.getByText("Chọn loại bảo hiểm")).toBeInTheDocument();
});
