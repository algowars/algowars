import { Button } from "@/components/ui/button";
import { useAuthSignupButton } from "./auth-signup-button.hooks";
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
  className?: string;
};

const AuthSignupButton = ({ variant, children, className = "" }: Props) => {
  const { handleSignUp } = useAuthSignupButton();

  return (
    <Button onClick={handleSignUp} variant={variant} className={className}>
      {children}
    </Button>
  );
};

export default AuthSignupButton;
