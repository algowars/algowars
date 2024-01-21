import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  test("Should render the component", () => {
    render(<Container />);
  });

  test("Should render children correctly", () => {
    render(
      <Container>
        <div data-testid="test-child">Test Child</div>
      </Container>
    );
    expect(screen.getByTestId("test-child")).not.to.be.null;
  });
});
