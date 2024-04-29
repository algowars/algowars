import { buttonVariants } from "@/components/ui/button";
import { NavLink as Link } from "@/layout/navbar/nav-link";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
  const navLinks: Link[] = [
    {
      title: "Profile",
      href: "/settings",
    },
    {
      title: "Account",
      href: "/settings/account",
    },
    {
      title: "Appearance",
      href: "/settings/appearance",
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
    },
  ];
  return (
    <ul>
      {navLinks.map((link) => (
        <li key={link.title}>
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant:
                    isActive && link.href === "/settings"
                      ? "ghost"
                      : isActive
                      ? "secondary"
                      : "ghost",
                }),
                "w-full justify-start text-left"
              )
            }
          >
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SettingsNav;
