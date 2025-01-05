import { routerConfig } from "@/app/router";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";
import { NavbarMenu } from "../navbar-menu/navbar-menu";

type LandingNavbarProps = {
  isAuthenticated?: boolean;
};

export const LandingNavbar = ({ isAuthenticated }: LandingNavbarProps) => {
  const { roles } = useAuthPermissions();
  return (
    <nav>
      <Container className="flex items-center py-3 px-3 lg:px-0">
        <Link to={routerConfig.root.path}>
          <Logo />
        </Link>
        <ul className="hidden sm:flex items-center gap-5 ml-auto">
          {isAuthenticated ? (
            <>
              {roles.includes("Admin") ? (
                <li>
                  <Link to={routerConfig.admin.path}>Admin</Link>
                </li>
              ) : null}
              <li>
                <Link to={routerConfig.appRoot.path}>Home</Link>
              </li>
              <li>
                <LogoutButton>Sign Out</LogoutButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={routerConfig.dashboard.path}>Home</Link>
              </li>
              <li>
                <LoginButton variant="outline" className="w-24" />
              </li>
              <li>
                <SignupButton className="w-24" />
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          )}
        </ul>
        <NavbarMenu className="ml-auto sm:hidden" />
      </Container>
    </nav>
  );
};
