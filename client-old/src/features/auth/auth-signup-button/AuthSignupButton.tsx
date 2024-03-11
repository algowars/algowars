import { Button } from "@/components/ui/button";
import { useAuthSignupButton } from "./AuthSignupButton.hooks";

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

const AuthSignupButton = ({ variant = "outline" }: Props) => {
  const { handleSignUp } = useAuthSignupButton();

  return (
    <Button onClick={handleSignUp} variant={variant}>
      Sign up
    </Button>
  );
};

export default AuthSignupButton;
