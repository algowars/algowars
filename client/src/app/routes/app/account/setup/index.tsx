import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, AccountStatus } from "@/features/account/account.provider";
import { Container } from "@/components/container";
import { routerConfig } from "@/app/router-config";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { Layout } from "@/components/layouts/layout/layout";
import { AccountSetupForm } from "@/features/account/account-setup-form/account-setup-form";

export const AccountSetupRoute = () => {
  const { status, isLoading } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (status === AccountStatus.FullyAuthenticated) {
        navigate(routerConfig.root.path);
      }
    }
  }, [status, isLoading, navigate]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout hideBanners>
      <section>
        <Container className="flex items-center justify-center py-8">
          <AccountSetupForm />
        </Container>
      </section>
    </Layout>
  );
};
