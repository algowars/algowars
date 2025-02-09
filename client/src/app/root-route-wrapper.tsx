import { AccountStatus, useAccount } from "@/features/account/account.provider";
import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { DashboardRoute } from "./routes/app/dashboard";
import { LandingRoute } from "./routes/landing";

export const RootRouteWrapper = (props: object) => {
  const { status, isLoading } = useAccount();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isPartiallyAuthenticated(status)) {
    return <ProtectedRoute component={DashboardRoute} {...props} />;
  }

  return <LandingRoute />;
};

function isPartiallyAuthenticated(status: AccountStatus) {
  return [
    AccountStatus.FullyAuthenticated,
    AccountStatus.PartiallyAuthenticated,
  ].includes(status);
}
