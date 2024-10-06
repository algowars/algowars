import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Pager } from "@/components/pagination";
import { PaginationProvider } from "@/components/pagination/pagination-context.provider";
import { PaginationFooter } from "@/components/pagination/pagination-footer";
import { useAuth0 } from "@auth0/auth0-react";

export const DashboardRoute = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <Container>
        <div className="flex items-center justify-between">
          <PaginationProvider>
            <PaginationFooter />
            <Pager />
          </PaginationProvider>
        </div>
      </Container>
    </Layout>
  );
};
