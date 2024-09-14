import { render } from "@testing-library/react";
import { MainErrorFallback } from "./main-error-fallback";

describe("MainErrorFallback", () => {
  test("should render", () => {
    render(<MainErrorFallback />);
  });
});
