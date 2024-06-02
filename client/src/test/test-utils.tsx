import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export function renderWithRouter(
  ui: ReactElement,
  { initialRoutes = ["/"], initialIndex = 0 } = {}
) {
  return {
    ...render(
      <MemoryRouter initialEntries={initialRoutes} initialIndex={initialIndex}>
        {ui}
      </MemoryRouter>
    ),
  };
}
