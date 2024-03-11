import { Link } from "react-router-dom";
import Container from "../container/container";
import { buttonVariants } from "@/components/ui/button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import ThemeToggle from "@/features/theme/theme-toggle/theme-toggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 border-b py-3">
      <Container className="flex justify-between items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Career Quest</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-3">
          <li>
            <Link
              to="/dashboard"
              className={buttonVariants({ variant: "ghost" })}
            >
              Home
            </Link>
          </li>
          <li>
            <AuthLogoutButton variant="outline">Log out</AuthLogoutButton>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
