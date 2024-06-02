import { buttonVariants } from "@/components/ui/button";
import AuthLoginButton from "@/features/auth/auth-login-button/auth-login-button";
import AuthSignupButton from "@/features/auth/auth-signup-button/auth-signup-button";
import { NavLink } from "./nav-link";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarAvatar from "./navbar-avatar/navbar-avatar";

export const useNavbar = () => {
  const { isAuthenticated, user } = useAuth0();

  const notLoggedInLinks: NavLink[] = [
    {
      name: "Home",
      href: "/",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Problems",
      href: "/problems",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "log in",
      element: (
        <AuthLoginButton variant={null} className="font-semibold p-0">
          Log in
        </AuthLoginButton>
      ),
    },
    {
      name: "sign up",
      element: (
        <AuthSignupButton variant={null} className="font-semibold">
          Sign up
        </AuthSignupButton>
      ),
    },
  ];

  const loggedInLinks: NavLink[] = [
    {
      name: "Home",
      href: "/",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Problems",
      href: "/problems",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Create",
      href: "/create",
      className: buttonVariants({ variant: "ghost" }),
    },
    {
      name: "Avatar",
      element: <NavbarAvatar url={user?.picture} />,
    },
  ];

  const links = isAuthenticated ? loggedInLinks : notLoggedInLinks;

  return { links };
};
