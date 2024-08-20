import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InsuranceApproval from "../../../pages/employee/InsuranceApproval";

test("InsuranceApproval mounts properly", () => {
  render(<InsuranceApproval />);
  expect(screen.getByText("không có yêu cầu chính sách !")).toBeInTheDocument();
});
