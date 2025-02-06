import { Button, ButtonProps } from "@/components/ui/button";
import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";

export const handleLogout = (
  logout: (options?: LogoutOptions) => Promise<void>
) => {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
};

export const LogoutButton = ({
  children = "Log Out",
  ...props
}: ButtonProps) => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => handleLogout(logout)} {...props}>
      {children}
    </Button>
  );
};
