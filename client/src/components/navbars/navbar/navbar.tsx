import { routerConfig } from "@/app/router";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useAccountStore } from "@/features/account/account-store.provider";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export type NavbarProps = {
  isAuthenticated?: boolean;
};

export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const { store } = useAccountStore();
  const profileUrl = store?.getState().account?.username ?? "";
  const { roles } = useAuthPermissions();

  return (
    <nav>
      <Container className="flex items-center py-3">
        <ul className="flex items-center gap-5">
          <li>
            <Link to={routerConfig.root.path}>
              <Logo />
            </Link>
          </li>
          <li>
            <Link to={routerConfig.root.path}>Home</Link>
          </li>
        </ul>

        <Button>
          <HamburgerMenuIcon />
        </Button>
        <ul className="flex items-center gap-5 ml-auto">
          {isAuthenticated ? (
            <>
              {roles.includes("Admin") ? (
                <li>
                  <Link to={routerConfig.admin.path}>Admin</Link>
                </li>
              ) : null}
              <li>
                <Link to={routerConfig.profile.execute(profileUrl)}>
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
