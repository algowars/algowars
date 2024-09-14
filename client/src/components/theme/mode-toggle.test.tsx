import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeToggle } from "./mode-toggle";
import { vi } from "vitest";

const setThemeMock = vi.fn();

vi.mock("./theme-provider", async () => {
  const actual =
    await vi.importActual<typeof import("./theme-provider")>(
      "./theme-provider"
    );
  return {
    ...actual,
    useTheme: () => ({
      setTheme: setThemeMock,
    }),
  };
});

describe("ModeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  test("renders correctly", () => {
    render(<ModeToggle />);

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  test('clicking on "Light" sets theme to "light"', async () => {
    render(<ModeToggle />);

    const user = userEvent.setup();

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(toggleButton);

    const lightMenuItem = await screen.findByRole("menuitem", {
      name: /light/i,
    });
    await user.click(lightMenuItem);

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  test('clicking on "Dark" sets theme to "dark"', async () => {
    render(<ModeToggle />);

    const user = userEvent.setup();

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(toggleButton);

    const darkMenuItem = await screen.findByRole("menuitem", { name: /dark/i });
    await user.click(darkMenuItem);

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  test('clicking on "System" sets theme to "system"', async () => {
    render(<ModeToggle />);

    const user = userEvent.setup();

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(toggleButton);

    const systemMenuItem = await screen.findByRole("menuitem", {
      name: /system/i,
    });
    await user.click(systemMenuItem);

    expect(setThemeMock).toHaveBeenCalledWith("system");
  });
});
