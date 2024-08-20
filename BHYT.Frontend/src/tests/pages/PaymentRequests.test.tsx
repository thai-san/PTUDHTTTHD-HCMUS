import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaymentRequests from "../../pages/PaymentRequests";

test("PaymentRequests mounts properly", () => {
  render(<PaymentRequests />);
  expect(screen.getByText("Yêu cầu thanh toán")).toBeInTheDocument();
});
