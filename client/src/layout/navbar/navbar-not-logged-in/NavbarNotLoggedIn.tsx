import ThemeToggle from "@/components/button/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import AuthLoginButton from "@/features/auth/auth-login-button/AuthLoginButton";
import AuthSignupButton from "@/features/auth/auth-signup-button/AuthSignupButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NavbarNotLoggedIn = () => {
  return (
    <ul className="flex gap-5 items-center">
      <li>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost" }))}>
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/problems"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Problem
        </Link>
      </li>
      <li>
        <AuthLoginButton />
      </li>
      <li>
        <AuthSignupButton />
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarNotLoggedIn;
