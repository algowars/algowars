import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import { MemoryRouter } from "react-router-dom";
import { ReactElement } from "react";

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(ui, { wrapper: MemoryRouter });
};

describe("Button", () => {
  test("Component Renders", () => {
    renderWithRouter(<Button>Test</Button>);
  });

  test("Should render link tag if href is passed", () => {
    const testHref = "http://test.com";
    renderWithRouter(<Button href={testHref}>Test</Button>);

    const button = screen.queryByRole("button");
    const link = screen.queryByRole("link");

    expect(link).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  test("Should render link tag if href is passed but is empty string", () => {
    const testHref = "";
    renderWithRouter(<Button href={testHref}>Test</Button>);

    const button = screen.queryByRole("button");
    const link = screen.queryByRole("link");

    expect(link).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  test("Should render a button if no href is passed", () => {
    renderWithRouter(<Button>Test</Button>);

    const button = screen.getByRole("button");
    const link = screen.queryByRole("link");

    expect(button).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });

  test("Should render a disabled button if disabled is true", () => {
    renderWithRouter(<Button disabled={true}>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });

  test("Should have the classNames if classNames are passed in", () => {
    const testClassName = "test-class";
    renderWithRouter(<Button className={testClassName}>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button.className).toBe(testClassName);
  });

  test("Should have the onClick binded on the button", () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click Button</Button>);

    const button = screen.getByRole("button", { name: "Click Button" });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
