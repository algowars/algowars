import { useAuth0 } from "@auth0/auth0-react";
import ButtonLightOutline from "../button-light-outline/ButtonLightOutline";

type Props = {
  className?: string;
};

const ButtonSignup = ({ className = "" }: Props) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/account/setup",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <ButtonLightOutline className={`p-3 ${className}`} onClick={handleSignUp}>
      Create Account
    </ButtonLightOutline>
  );
};

export default ButtonSignup;
