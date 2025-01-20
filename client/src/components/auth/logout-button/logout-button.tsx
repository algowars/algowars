import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

export type LogoutButtonProps = {
  children?: ReactNode;
};

export const LogoutButton = ({
  children = "Log Out",
  ...props
}: LogoutButtonProps) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {children}
    </Button>
  );
};
