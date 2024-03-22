import Logo from "@/components/logo/logo";
import { buttonVariants } from "@/components/ui/button";
import { useAuthLoginButton } from "@/features/auth/auth-login-button/auth-login-button.hooks";
import { useAuthSignupButton } from "@/features/auth/auth-signup-button/auth-signup-button.hooks";
import ThemeToggle from "@/features/theme/theme-toggle/theme-toggle";
import Container from "@/layout/container/container";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  width?: string;
  className?: string;
  border?: string;
};

const NavbarLoggedOut = ({ width, className, border = "border-b" }: Props) => {
  const { handleLogin } = useAuthLoginButton();
  const { handleSignUp } = useAuthSignupButton();
  return (
    <nav className={`sticky top-0 ${border} h-14 ${className}`}>
      <Container
        className="flex justify-between h-full items-center gap-5"
        width={width}
      >
        <ul className="flex items-center gap-5">
          <li>
            <Logo width="w-6" height="h-6" />
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Problems
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/battle"
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 text-foreground${
                  isActive ? "" : "/60"
                }`
              }
            >
              Battles
            </NavLink>
          </li>
          <li>
            <button
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              onClick={handleLogin}
            >
              Log in
            </button>
          </li>
          <li>
            <button
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </li>
        </ul>
        <ul className="flex items-center gap-1 text-sm">
          <li>
            <a
              href="https://github.com/algo-wars"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-10 h-10 p-0 flex items-center justify-center"
              )}
            >
              <Github size={16} />
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavbarLoggedOut;
