import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomerCompensations from "../../pages/CustomerCompensations";

test("CustomerCompensation mounts properly", () => {
  render(<CustomerCompensations />);
  expect(screen.getByText("Hiện quý khách không có yêu cầu nào !")).toBeInTheDocument();
});
