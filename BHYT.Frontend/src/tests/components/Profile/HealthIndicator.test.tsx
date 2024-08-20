import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HealthIndicator from "../../../components/Profile/HealthIndicator";

test("HealthIndicator mounts properly", () => {
  render(<HealthIndicator />);
  expect(screen.getByText("Thông tin sức khỏe")).toBeInTheDocument();
});
