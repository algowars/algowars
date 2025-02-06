import { useAccount } from "@/features/account/account.provider";
import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { DashboardRoute } from "./routes/app/dashboard";
import { LandingRoute } from "./routes/landing";

export const RootRouteWrapper = (props: object) => {
  const { isAuthenticated, isLoading } = useAccount();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <ProtectedRoute component={DashboardRoute} {...props} />;
  }

  return <LandingRoute />;
};
