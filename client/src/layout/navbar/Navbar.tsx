import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarLoggedIn from "./navbar-logged-in/NavbarLoggedIn";
import NavbarNotLoggedIn from "./navbar-not-logged-in/NavbarNotLoggedIn";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="fixed top-0 w-full border-b shadow-sm dark:border-border/40 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="p-2 flex justify-between items-center relative">
        <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Algowars</h1>
            </Link>
          </li>
        </ul>
        {isAuthenticated ? <NavbarLoggedIn /> : <NavbarNotLoggedIn />}
      </Container>
    </nav>
  );
};

export default Navbar;
