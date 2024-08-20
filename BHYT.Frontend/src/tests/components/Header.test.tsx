import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Header from "../../components/Header";

test("Header mounts properly", () => {
  render(
    <HashRouter>
      <Header />
    </HashRouter>
  );
  expect(screen.getByText("Trang chủ")).toBeInTheDocument();
});
