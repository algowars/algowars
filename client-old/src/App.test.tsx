import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProviders } from "./test/testUtils";

describe("App", () => {
  test("Component Renders", () => {
    renderWithProviders(<App />);
  });

  test("demo", () => {
    expect(true).toBe(true);
  });
});
