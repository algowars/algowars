import { routerConfig } from "@/app/router-config";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuthPermissions } from "@/components/auth/permissions/use-auth-permissions";
import { SignupButton } from "@/components/auth/signup-button";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
          <div className="p-2">
            <Card className="py-5 flex flex-col gap-5 p-3">
              <div className="mb-2">
                <h4 className="text-lg font-semibold">
                  Join the Algowars Community
                </h4>
                <p className="text-muted-foreground">
                  Sign up to interact, compete against other developers.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <SignupButton variant="outline" />
                <LoginButton variant="ghost" />
              </div>
            </Card>
          </div>
          <div className="px-5">
            <h5 className="font-semibold text-lg">Links</h5>
            <ul className="flex flex-col gap-5">
              <li>
                <Link to={routerConfig.problems.path}>Problems</Link>
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
                        "w-full text-start"
                      )}
                    >
                      Home
                    </Link>
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
