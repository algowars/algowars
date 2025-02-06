import { routerConfig } from "@/app/router-config";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";
import { NavbarMenu } from "../navbar-menu/navbar-menu";

export const LandingNavbar = () => {
  return (
    <nav>
      <Container className="flex items-center py-3 px-3 lg:px-0">
        <ul className="flex items-center gap-5">
          <li>
            <Link to={routerConfig.root.path}>
              <Logo />
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex items-center gap-5 ml-auto">
          <li>
            <Link to={routerConfig.problems.path}>Problems</Link>
          </li>
          <li>
            <LoginButton variant="outline" className="w-24" />
          </li>
          <li>
            <SignupButton className="w-24" />
          </li>
        </ul>
        <ModeToggle className="ml-3" />
        <NavbarMenu className="lg:hidden ml-auto" />
      </Container>
    </nav>
  );
};
