import { Button } from "@/components/ui/button";
import { useAuthLoginButton } from "./AuthLoginButton.hooks";

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

const AuthLoginButton = ({ variant = "ghost" }: Props) => {
  const { handleLogin } = useAuthLoginButton();

  return (
    <Button onClick={handleLogin} variant={variant}>
      Log in
    </Button>
  );
};

export default AuthLoginButton;
