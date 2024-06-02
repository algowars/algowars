import { vi } from "vitest";
import { beforeEach } from "node:test";
import { describe, test, expect } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./theme.provider";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

vi.stubGlobal("localStorage", mockLocalStorage);

window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: query.includes("dark"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span>{`Current theme is ${theme}`}</span>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    cleanup();
  });

  test("Should set the initial theme from localStorage", () => {
    mockLocalStorage.getItem.mockReturnValue("dark");
    const { getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText(/current theme is dark/i)).toBeInTheDocument();
  });

  test("Should change the theme on setTheme call", () => {
    mockLocalStorage.getItem.mockReturnValue("light");

    const { getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(getByText(/toggle theme/i));
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "vite-ui-theme",
      "dark"
    );
    expect(getByText(/current theme is dark/i)).toBeInTheDocument();
  });
});
