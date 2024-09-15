import { LoginButton } from "@/components/auth/login-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";

export const LandingNavbar = () => {
  return (
    <nav>
      <Container className="flex items-center py-3">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="flex items-center gap-5 ml-auto">
          <li>
            <LoginButton variant="outline" className="w-24" />
          </li>
          <li>
            <SignupButton className="w-24" />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};
