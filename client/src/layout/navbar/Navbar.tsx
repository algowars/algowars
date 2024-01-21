import { Link } from "react-router-dom";
import Container from "../container/Container";
import ThemeToggle from "@/components/button/ThemeToggle";

const Navbar = () => {
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
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/" className="py-2 px-2 block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/problems" className="py-2 px-2 block">
              Problem
            </Link>
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
