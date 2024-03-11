import { describe, test } from "vitest";
import Navbar from "./Navbar";
import { renderWithProviders } from "../../test/testUtils";

describe("Navbar", () => {
  test("Should render the component", () => {
    renderWithProviders(<Navbar />);
  });
});
