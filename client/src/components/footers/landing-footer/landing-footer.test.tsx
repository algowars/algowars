import { LandingFooter } from "./landing-footer";
import { renderApp } from "@/testing/test-utils";

describe("LandingFooter", () => {
  test("should render", () => {
    renderApp(<LandingFooter />, {
      skipWaitForLoading: true,
    });
  });
});
