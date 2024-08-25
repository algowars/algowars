import AccountSetup from "@/features/account/account-setup/account-setup";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const AccountSetupPage = () => {
  return (
    <Layout hideAccountExistBanner>
      <Container className="min-h-[80vh] flex justify-center py-24">
        <AccountSetup />
      </Container>
    </Layout>
  );
};

export default AccountSetupPage;
