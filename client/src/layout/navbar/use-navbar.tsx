import { buttonVariants } from "@/components/ui/button";
import AuthLoginButton from "@/features/auth/auth-login-button/auth-login-button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import AuthSignupButton from "@/features/auth/auth-signup-button/auth-signup-button";
import ThemeToggle from "@/features/theme/theme-toggle/theme-toggle";
import { NavLink } from "./nav-link";
import { useAuth0 } from "@auth0/auth0-react";

export const useNavbar = () => {
  const { isAuthenticated } = useAuth0();

  const notLoggedInLinks: NavLink[] = [
    {
      name: "log in",
      element: <AuthLoginButton variant="outline">Log in</AuthLoginButton>,
    },
    {
      name: "sign up",
      element: <AuthSignupButton variant="default">Sign up</AuthSignupButton>,
    },
  ];

  const loggedInLinks: NavLink[] = [
    {
      name: "Home",
      href: "/dashboard",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Create",
      href: "/create",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Log out",
      element: <AuthLogoutButton variant="outline">Log out</AuthLogoutButton>,
    },
    {
      name: "Theme toggle",
      element: <ThemeToggle />,
    },
  ];

  const links = isAuthenticated ? loggedInLinks : notLoggedInLinks;

  return { links };
};
