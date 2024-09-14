import { renderApp } from "@/testing/test-utils";
import { LandingNavbar } from "./landing-navbar";

describe("LandingNavbar", () => {
  test("should be defined", () => {
    renderApp(<LandingNavbar />, {
      skipWaitForLoading: true,
    });
  });
});
