import { renderApp, screen } from "@/testing/test-utils";
import { LandingLayout } from "./landing-layout";

describe("LandingLayout", () => {
  test("should render", () => {
    renderApp(
      <LandingLayout>
        <p>Test</p>
      </LandingLayout>,
      {
        skipWaitForLoading: true,
      }
    );
  });

  test("should render children", async () => {
    await renderApp(
      <LandingLayout>
        <p>Test Content</p>
      </LandingLayout>,
      {
        skipWaitForLoading: true,
      }
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
