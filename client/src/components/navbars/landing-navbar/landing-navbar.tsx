import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";

type LandingNavbarProps = {
  isAuthenticated?: boolean;
};

export const LandingNavbar = ({ isAuthenticated }: LandingNavbarProps) => {
  return (
    <nav>
      <Container className="flex items-center py-3">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="flex items-center gap-5 ml-auto">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/app">Home</Link>
              </li>
              <li>
                <LogoutButton>Sign Out</LogoutButton>
              </li>
            </>
          ) : (
            <>
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
      </Container>
    </nav>
  );
};
