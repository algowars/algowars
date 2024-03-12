import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "@/layout/navbar/nav-link";
import AuthLogoutButton from "./auth-logout-button/auth-logout-button";
import ThemeToggle from "../theme/theme-toggle/theme-toggle";

export const authNavLinks: NavLink[] = [
  {
    name: "Home",
    href: "/dashboard",
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
