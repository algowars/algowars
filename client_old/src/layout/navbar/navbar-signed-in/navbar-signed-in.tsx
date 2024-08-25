import Container from "@/layout/container/container";
import NavbarAvatar from "../navbar-avatar/navbar-avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/store/use-app-selector";
import { Role } from "@/features/auth/auth-roles/role";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "../nav-link";
import { adminLinks, createLink, signedInLinks } from "../nav-links";
import Logo from "@/components/logo/logo";

type Props = {
  width?: string;
  className?: string;
  border?: string;
};

const NavbarSignedIn = ({ width, className, border = "border-b" }: Props) => {
  const { user } = useAuth0();

  const { roles } = useAppSelector((state) => state.roles);

  const isAdmin = roles.includes(Role.ADMIN);

  const links = isAdmin ? adminLinks : signedInLinks;

  return (
    <nav className={`sticky top-0 ${border} h-14 ${className}`}>
      <Container
        className="flex justify-between h-full items-center gap-5"
        width={width}
      >
        <ul className="flex items-center gap-5">
          <li>
            <Logo />
          </li>
          <li>
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link: NavLink) => createLink(link))}
              </NavigationMenuList>
            </NavigationMenu>
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
