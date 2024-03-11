import { Button } from "@/components/ui/button";
import { useAuthLogoutButton } from "./AuthLogoutButton.hooks";

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
};

const AuthLogoutButton = ({ variant = "ghost" }: Props) => {
  const { handleLogout } = useAuthLogoutButton();

  return (
    <Button onClick={handleLogout} variant={variant}>
      Log out
    </Button>
  );
};

export default AuthLogoutButton;
