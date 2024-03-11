import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ContainerSmall from "./ContainerSmall";

describe("Container Small", () => {
  test("Should render the component", () => {
    render(<ContainerSmall />);
  });

  test("Should render children correctly", () => {
    render(
      <ContainerSmall>
        <div data-testid="test-child">Test Child</div>
      </ContainerSmall>
    );
    expect(screen.getByTestId("test-child")).not.to.be.null;
  });
});
