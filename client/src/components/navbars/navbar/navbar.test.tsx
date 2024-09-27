import { Navbar } from "./navbar";
import { renderApp } from "@/testing/test-utils";

describe("Navbar", () => {
  test("should be defined", () => {
    renderApp(<Navbar />, { skipWaitForLoading: true });
  });
});
