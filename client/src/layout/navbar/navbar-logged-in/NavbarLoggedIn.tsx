import ThemeToggle from "@/components/button/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/AuthLogoutButton";
import { Link } from "react-router-dom";

const NavbarLoggedIn = () => {
  return (
    <ul className="flex items-center gap-5">
      <li>
        <Link to="/" className={buttonVariants({ variant: "ghost" })}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/problems" className={buttonVariants({ variant: "ghost" })}>
          Problem
        </Link>
      </li>
      <li>
        <AuthLogoutButton />
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarLoggedIn;
