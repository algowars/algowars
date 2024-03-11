import { Button } from "@/components/ui/button";
import { useAuthLogoutButton } from "./auth-logout-button.hooks";
import { ReactNode } from "react";

type Props = {
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  children?: ReactNode;
};

const AuthLogoutButton = ({ variant = "ghost", children }: Props) => {
  const { handleLogout } = useAuthLogoutButton();

  return (
    <Button onClick={handleLogout} variant={variant}>
      {children}
    </Button>
  );
};

export default AuthLogoutButton;
