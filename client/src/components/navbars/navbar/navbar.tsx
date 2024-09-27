import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";
import { useAccountStore } from "@/features/account/account-store.provider";

export type NavbarProps = {
  isAuthenticated?: boolean;
};

export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const { store } = useAccountStore();
  const profileUrl = store?.getState().account?.username ?? "";

  return (
    <nav>
      <Container className="flex items-center py-3">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <ul className="flex items-center gap-5 ml-auto">
          {isAuthenticated ? (
            <>
              <li>
                <Link to={`/profile/${encodeURIComponent(profileUrl)}`}>
                  Profile
                </Link>
              </li>
              <li>
                <LogoutButton>Sign Out</LogoutButton>
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          ) : (
            <>
              <li>
                <LoginButton variant="outline" className="w-24" />
              </li>
              <li>
                <SignupButton className="w-24" />
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          )}
        </ul>
      </Container>
    </nav>
  );
};