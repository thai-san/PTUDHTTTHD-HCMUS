import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserProfile from "../../pages/UserProfile";

test("UserProfile mounts properly", () => {
  render(<UserProfile />);
  expect(screen.getByText("Thông tin chung")).toBeInTheDocument();
});
