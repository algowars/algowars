import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { AccountSetupForm } from "@/features/account/account-setup-form/account-setup-form";
import { useAccountStore } from "@/features/account/account-store.provider";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const AccountSetupRoute = () => {
  const { isAuthenticated: isAuthAuthenticated, isLoading: isAuthLoading } =
    useAuth0();
  const { isAuthenticated, isLoading } = useAccountStore();
  const navigate = useNavigate();

  if (!isAuthLoading && isAuthAuthenticated) {
    if (!isLoading && isAuthenticated) {
      navigate("/app");
    }
  }

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
