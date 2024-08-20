import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ApprovedInsurancePolicies from "../../../pages/employee/ApprovedInsurancePolicies";

test("ApprovedInsurancePolicies mounts properly", () => {
  render(<ApprovedInsurancePolicies />);
  expect(screen.getByText("Chính sách đã được phát hành")).toBeInTheDocument();
});
