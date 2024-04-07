import Logo from "@/components/logo/logo";
import Container from "@/layout/container/container";
import { NavLink } from "react-router-dom";
import NavbarAvatar from "../navbar-avatar/navbar-avatar";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  width?: string;
  className?: string;
  border?: string;
};

const NavbarSignedIn = ({ width, className, border = "border-b" }: Props) => {
  const { user } = useAuth0();
  return (
    <nav className={`sticky top-0 ${border} h-14 ${className}`}>
      <Container
        className="flex justify-between h-full items-center gap-5"
        width={width}
      >
        <ul className="flex items-center gap-5">
          <li>
            <NavLink to="/" className="flex items-center gap-3">
              <Logo width="w-6" height="h-6" hideLink />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Problems
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/battle"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Battles
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-1 text-sm">
          <li>
            <NavbarAvatar url={user?.picture} />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavbarSignedIn;
