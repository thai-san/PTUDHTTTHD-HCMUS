import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AllPaymentRequests from "../../../pages/employee/AllPaymentRequests";

test("AllPaymentRequests mounts properly", () => {
  render(<AllPaymentRequests />);
  expect(screen.getByText("Yêu cầu thanh toán")).toBeInTheDocument();
});
