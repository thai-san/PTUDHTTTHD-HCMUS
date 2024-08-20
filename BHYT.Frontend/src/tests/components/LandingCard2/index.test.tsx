import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingCard2 from "../../../components/LandingCard2";

test("LandingCard2 mounts properly", () => {
  render(<LandingCard2 />);
  expect(
    screen.getByText(
      "Tạo dựng nền tảng tài chính, xây đắp cuộc sống sung túc cho bạn và gia đình. Truyền thụ tinh hoa cho thế hệ mai sau"
    )
  ).toBeInTheDocument();
});
