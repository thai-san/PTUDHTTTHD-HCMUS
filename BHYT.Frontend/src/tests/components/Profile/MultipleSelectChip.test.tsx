import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MultipleSelectChip from "../../../components/Profile/MultipleSelectChip";

test("MultipleSelectChip mounts properly", () => {
  const sendDiseases = (diseases: string[] | string) => {
    console.log(diseases);
  };
  render(<MultipleSelectChip sendDiseases={sendDiseases} />);
  expect(screen.getAllByText("Cập nhật bệnh")[0]).toBeInTheDocument();
});
