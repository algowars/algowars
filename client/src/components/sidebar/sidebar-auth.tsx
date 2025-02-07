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

export const SidebarAuth = () => {
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
