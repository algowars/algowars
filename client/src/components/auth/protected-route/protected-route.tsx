import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { useAccountStore } from "@/features/account/account-store.provider";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

export type ProtectedRouteProps = {
  component: ComponentType<object>;
};

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useAccountStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isLoading && !isAuthenticated) {
    return navigate(-1);
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
};
