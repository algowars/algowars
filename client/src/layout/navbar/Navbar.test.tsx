import { describe, test } from "vitest";
import Navbar from "./Navbar";
import { renderWithRouter } from "../../test/testUtils";

describe("Navbar", () => {
  test("Should render the component", () => {
    renderWithRouter(<Navbar />);
  });
});
