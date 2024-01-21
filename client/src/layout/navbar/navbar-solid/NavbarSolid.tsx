import { Link } from "react-router-dom";
import ThemeToggle from "@/components/button/ThemeToggle";
import Container from "@/layout/container/Container";

const NavbarSolid = () => {
  return (
    <nav className="border-b shadow-sm">
      <Container
        width="w-full"
        className="p-2 flex justify-between items-center relative"
      >
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

export default NavbarSolid;
