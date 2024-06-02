import PageLoader from "@/components/loader/page-loader/page-loader";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface AuthenticationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
