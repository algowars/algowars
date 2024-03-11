import { vi } from "vitest";

const mockUser = {
  email: "test@example.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

export const useAuth0Mock = (user = mockUser) => ({
  isAuthenticated: true,
  user,
  logout: vi.fn(),
  loginWithRedirect: vi.fn(),
  getAccessTokenSilently: vi.fn(),
});
