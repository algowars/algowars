import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { AccountSetupForm } from "@/features/account/account-setup-form/account-setup-form";

export const AccountSetupRoute = () => {
  return (
    <Layout>
      <section>
        <Container className="flex items-center justify-center py-8">
          <AccountSetupForm />
        </Container>
      </section>
    </Layout>
  );
};
