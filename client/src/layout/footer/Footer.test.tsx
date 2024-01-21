import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("Should render component", () => {
    render(<Footer />);
  });
});
