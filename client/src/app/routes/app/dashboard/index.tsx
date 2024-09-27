import { Layout } from "@/components/layouts/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";

export const DashboardRoute = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <h1>Dashboard</h1>
    </Layout>
  );
};
