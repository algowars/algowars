import { routerConfig } from "@/app/router-config";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { Link } from "@/components/ui/link";
import { NavbarMenu } from "../navbar-menu/navbar-menu";
import { AccountStatus, useAccount } from "@/features/account/account.provider";
import { buttonVariants } from "@/components/ui/button";
import { NavbarAvatar } from "../navbar-avatar/navbar-avatar";

export const Navbar = () => {
  const { status } = useAccount();
  const { roles } = useAuthPermissions();

  return (
    <nav className="border-b">
      <Container className="flex items-center py-3 px-3 lg:px-0">
        <ul className="flex items-center gap-5">
          <li>
            <Link to={routerConfig.root.path}>
              <Logo />
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex items-center gap-5 ml-auto">
          <li>
            <Link to={routerConfig.root.path}>Home</Link>
          </li>
          <li>
            <Link to={routerConfig.problems.path}>Problems</Link>
          </li>
          {status === AccountStatus.FullyAuthenticated ? (
            <>
              {roles.includes("Admin") && (
                <li>
                  <Link to={routerConfig.admin.path}>Admin</Link>
                </li>
              )}
              <li>
                <Link to={routerConfig.soloRush.path}>Rush</Link>
              </li>
              <li>
                <NavbarAvatar />
              </li>
            </>
          ) : status === AccountStatus.PartiallyAuthenticated ? (
            <>
              <li>
                <Link
                  to="/finish-setup"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Finish Setting Up Account
                </Link>
              </li>
              <li>
                <LogoutButton />
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
            </>
          )}
        </ul>
        <NavbarMenu className="lg:hidden ml-auto" />
      </Container>
    </nav>
  );
};
