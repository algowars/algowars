import { AccountStatus, useAccount } from "@/features/account/account.provider";
import { LoginButton } from "../auth/login-button";
import { SignupButton } from "../auth/signup-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SidebarContent } from "../ui/sidebar";
import { Link } from "react-router-dom";
import { routerConfig } from "@/app/router-config";
import { buttonVariants } from "../ui/button";
import { SidebarUser } from "./sidebar-user";
import { LogoutButton } from "../auth/logout-button";

export const SidebarAuth = () => {
  const { status } = useAccount();

  if (status === AccountStatus.FullyAuthenticated) {
    return <SidebarUser />;
  }

  if (status === AccountStatus.PartiallyAuthenticated) {
    return (
      <SidebarContent className="group-data-[collapsible=icon]:w-0">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Setup Your Account</CardTitle>
            <CardDescription>
              To access all Algowars features, finish setting up your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5 p-4">
            <Link
              to={routerConfig.accountSetup.path}
              className={buttonVariants({ variant: "default" })}
            >
              Finish Setting Up Account
            </Link>
            <LogoutButton variant="ghost" />
          </CardContent>
        </Card>
      </SidebarContent>
    );
  }
  return (
    <SidebarContent className="group-data-[collapsible=icon]:w-0">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-sm">Join the Algowars Community</CardTitle>
          <CardDescription>
            Sign up or login to access all the features
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <SignupButton variant="outline" />
          <LoginButton variant="ghost" />
        </CardContent>
      </Card>
    </SidebarContent>
  );
};
