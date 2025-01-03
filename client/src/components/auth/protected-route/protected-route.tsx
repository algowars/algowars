import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { useAccountStore } from "@/features/account/account-store.provider";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export type ProtectedRouteProps = {
  component: ComponentType<object>;
};

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const { isLoading } = useAccountStore();

  if (isLoading) {
    return <PageLoader />;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
};
