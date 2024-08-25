import { Button } from "@/components/ui/button";
import { useAuthLoginButton } from "@/features/auth/auth-login-button/auth-login-button.hooks";
import { useAuthSignupButton } from "@/features/auth/auth-signup-button/auth-signup-button.hooks";

const LayoutProblemNavbarLoggedOut = () => {
  const { handleLogin } = useAuthLoginButton();
  const { handleSignUp } = useAuthSignupButton();
  return (
    <ul className="flex items-center gap-3 text-sm">
      <li>
        <Button variant="ghost" onClick={handleLogin} className="w-24">
          Log in
        </Button>
      </li>
      <li>
        <Button variant="outline" className="w-24" onClick={handleSignUp}>
          Sign up
        </Button>
      </li>
    </ul>
  );
};

export default LayoutProblemNavbarLoggedOut;
