import { render } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  test("should render children in the container", () => {
    const expectedText = "Test Content";
    const { getByText } = render(
      <Container>
        <p>{expectedText}</p>
      </Container>
    );

    expect(getByText(expectedText)).toBeInTheDocument();
  });

  test("should render without the children in the container", () => {
    render(<Container></Container>);
  });

  test("should add the className to the container", () => {
    const expectedClassName = "test-class";

    const { container } = render(
      <Container className={expectedClassName}>
        <p>Test</p>
      </Container>
    );

    const divElement = container.firstChild;
    expect(divElement).toHaveClass(expectedClassName);
  });
});
