import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export type ProtectedRouteProps = {
  component: ComponentType<object>;
};

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <p>Loading...</p>
      </div>
    ),
  });

  return <Component />;
};
