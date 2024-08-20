import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InsuranceInformation from "../../components/InsuranceInfor";

test("InsuranceInformation mounts properly", () => {
  render(<InsuranceInformation />);
  expect(screen.getByText("Thông Tin Chi Tiết")).toBeInTheDocument();
});
