import Logo from "@/components/logo/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useAuthLoginButton } from "@/features/auth/auth-login-button/auth-login-button.hooks";
import { useAuthSignupButton } from "@/features/auth/auth-signup-button/auth-signup-button.hooks";
import Container from "@/layout/container/container";
import { createLink, signedOutLinks } from "../nav-links";
import { NavLink } from "../nav-link";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
            <Logo />
          </li>
          <li>
            <NavigationMenu>
              {signedOutLinks.map((link: NavLink) => createLink(link))}
            </NavigationMenu>
          </li>
        </ul>
        <ul className="flex items-center gap-3 text-sm">
          <li>
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: "outline" }), "w-24")}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: "outline" }), "w-24")}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavbarLoggedOut;
