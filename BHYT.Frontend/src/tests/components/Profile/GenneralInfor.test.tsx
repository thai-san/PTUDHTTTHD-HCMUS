import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GenneralInfor from "../../../components/Profile/GenneralInfor";

test("GenneralInfor mounts properly", () => {
  render(<GenneralInfor />);
  expect(screen.getByText("Thông tin chung")).toBeInTheDocument();
});
