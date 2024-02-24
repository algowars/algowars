import ThemeToggle from "@/components/button/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavbarLoggedIn = () => {
  return (
    <ul>
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
        <Button>Log out</Button>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarLoggedIn;
