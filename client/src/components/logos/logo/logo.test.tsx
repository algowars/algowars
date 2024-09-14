import { render } from "@testing-library/react";
import { Logo } from "./logo";

describe("Logo", () => {
  test("should add the image class name from the props", () => {
    const imageClassNames = "test-class";

    const { getByRole } = render(<Logo imgClassName={imageClassNames} />);

    const imgElement = getByRole("img");

    expect(imgElement).toHaveClass(imageClassNames);
  });

  test("should add the parent class name from the props", () => {
    const className = "test-class";

    const { container } = render(<Logo className={className} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toHaveClass(className);
  });
});
