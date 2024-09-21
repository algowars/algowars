import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";

export type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav>
      <Container className="flex items-center py-3">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="flex items-center gap-5 ml-auto">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};
