import "@testing-library/jest-dom/vitest";

import { initializeDb, resetDb } from "@/testing/mocks/db";
import { server } from "@/testing/mocks/server";

vi.mock("zustand");

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false, // or true if you want to simulate a matching media query
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated method, but might be used by older libraries
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  window.btoa = (str: string) => Buffer.from(str, "binary").toString("base64");
  window.atob = (str: string) => Buffer.from(str, "base64").toString("binary");

  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
