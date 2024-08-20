import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingCard from "../../../components/LandingCard";

test("LandingCard mounts properly", () => {
  render(<LandingCard />);
  expect(screen.getByText("Bảo hiểm Sức khỏe")).toBeInTheDocument();
});
