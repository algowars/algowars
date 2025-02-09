import { routerConfig } from "@/app/router-config";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";
import { SignupButton } from "@/components/auth/signup-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AccountStatus, useAccount } from "@/features/account/account.provider";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

type NavbarMenuProps = {
  className?: string;
};

export const NavbarMenu = ({ className }: NavbarMenuProps) => {
  const { status, account } = useAccount();
  const profileUrl = account
    ? routerConfig.profile.execute(account.username)
    : "";
  const { roles } = useAuthPermissions();
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger className="p-2">
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent className="p-0 flex flex-col gap-2">
          <SheetHeader className="p-3">
            <SheetTitle>Algowars</SheetTitle>
          </SheetHeader>
          <div className="px-5">
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  to={routerConfig.problems.path}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full text-start justify-start"
                  )}
                >
                  Problems
                </Link>
              </li>
              {status === AccountStatus.FullyAuthenticated ? (
                <>
                  <li>
                    <Link to={routerConfig.root.path}>Home</Link>
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
                    <Link to={routerConfig.root.path}>Dashboard</Link>
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
                    <Link
                      to={routerConfig.root.path}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full text-start justify-start"
                      )}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <LoginButton
                      variant="ghost"
                      className="w-full text-start justify-start"
                    />
                  </li>
                  <li>
                    <SignupButton
                      variant="ghost"
                      className="w-full text-start justify-start"
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
