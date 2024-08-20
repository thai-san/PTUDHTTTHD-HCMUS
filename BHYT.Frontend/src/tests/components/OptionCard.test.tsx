import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OptionCard from "../../components/OptionCard";

const option = {
  name: "Thông Tin Chi Tiết",
  description: "Thông tin chi tiết về bảo hiểm",
  icon: "https://i.ibb.co/7pW4QHz/Group-1.png",
  link: "/insurance-detail",
};

test("OptionCard mounts properly", () => {
  render(<OptionCard option={option} />);
  expect(screen.getByText("Thông Tin Chi Tiết")).toBeInTheDocument();
});
