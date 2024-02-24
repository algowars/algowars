import ThemeToggle from "@/components/button/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
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
        <Button variant="ghost">Log in</Button>
      </li>
      <li>
        <Button variant="outline">Sign up</Button>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarNotLoggedIn;
