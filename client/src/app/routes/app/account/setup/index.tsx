import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, AccountStatus } from "@/features/account/account.provider";
import { Container } from "@/components/container";
import { routerConfig } from "@/app/router-config";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { AccountSetupForm } from "@/features/account/account-setup-form/account-setup-form";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";

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
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.accountSetup.path,
          name: "Account Setup",
        },
      ]}
    >
      <section>
        <Container className="flex items-center justify-center py-8">
          <AccountSetupForm />
        </Container>
      </section>
    </SidebarLayout>
  );
};
