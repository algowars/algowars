import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
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
            <Link to="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/problems"
              className={buttonVariants({ variant: "ghost" })}
            >
              Problems
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};
