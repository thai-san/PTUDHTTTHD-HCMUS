import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Customer from "../../../pages/employee/Customer";

test("Customer mounts properly", () => {
  render(<Customer />);
  expect(screen.getByText("Danh sách khách hàng")).toBeInTheDocument();
});
