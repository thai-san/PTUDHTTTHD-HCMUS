import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ConfirmDialog from "../../components/ConfirmDialog";

test("ConfirmDialog mounts properly", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(<ConfirmDialog open={true} title="Test" message="Test1" onConfirm={() => {}} onClose={() => {}} />);
  expect(screen.getByText("Test")).toBeInTheDocument();
});
