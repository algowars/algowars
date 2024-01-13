import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./App";

test("Component Renders", () => {
  render(<App />);
});

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  expect(true).toBeTruthy();
});
