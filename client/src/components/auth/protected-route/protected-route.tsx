import { useAccountStore } from "@/features/account/account-store.provider";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export type ProtectedRouteProps = {
  component: ComponentType<object>;
};

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const auth = useAuth0();
  const account = useAccountStore();

  console.log(auth, account);
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <p>Loading...</p>
      </div>
    ),
  });

  return <Component />;
};
