import { ComponentType, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuthPermissions } from "../permissions/use-auth-permissions";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { useNavigate } from "react-router-dom";

export type PermissionProtectedRouteProps = {
  component: ComponentType<object>;
  allowedPermissions: string[];
};

export const PermissionProtectedRoute = ({
  component,
  allowedPermissions,
  ...props
}: PermissionProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const { roles } = useAuthPermissions();
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  const hasPermission = roles.some((role) => allowedPermissions.includes(role));

  if (isLoading) {
    return null;
  }

  return isAuthenticated && hasPermission ? <Component {...props} /> : null;
};
