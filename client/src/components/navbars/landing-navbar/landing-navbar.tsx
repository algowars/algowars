import { routerConfig } from "@/app/router";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "@/components/ui/link";
import { NavbarMenu } from "../navbar-menu/navbar-menu";
import { AccountStatus, useAccount } from "@/features/account/account.provider";
import { buttonVariants } from "@/components/ui/button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";

export const LandingNavbar = () => {
  const { status, account } = useAccount();
  const profileUrl = account
    ? routerConfig.profile.execute(account.username)
    : "";
  const { roles } = useAuthPermissions();

  return (
    <nav>
      <Container className="flex items-center py-3 px-3 lg:px-0">
        <ul className="flex items-center gap-5">
          <li>
            <Link to={routerConfig.root.path}>
              <Logo />
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex items-center gap-5 ml-auto">
          {status === AccountStatus.FullyAuthenticated ? (
            <>
              <li>
                <Link to={routerConfig.appRoot.path}>Home</Link>
              </li>
              {roles.includes("Admin") && (
                <li>
                  <Link to={routerConfig.admin.path}>Admin</Link>
                </li>
              )}
              <li>
                <Link to={profileUrl}>Profile</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : status === AccountStatus.PartiallyAuthenticated ? (
            <>
              <li>
                <Link to={routerConfig.root.path}>Home</Link>
              </li>
              <li>
                <Link
                  to={routerConfig.accountSetup.path}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Finish Setting Up Account
                </Link>
              </li>
              <li>
                <LogoutButton>Log Out</LogoutButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={routerConfig.dashboard.path}>Home</Link>
              </li>
              <li>
                <LoginButton variant="outline" className="w-24" />
              </li>
              <li>
                <SignupButton className="w-24" />
              </li>
            </>
          )}
        </ul>
        <ModeToggle className="ml-3" />
        <NavbarMenu className="lg:hidden ml-auto" />
      </Container>
    </nav>
  );
};
