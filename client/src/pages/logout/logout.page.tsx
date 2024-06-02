import { Card } from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/typography-h2";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const LogoutPage = () => {
  return (
    <Layout>
      <Container className="py-10">
        <Card className="p-5 flex flex-col gap-5 items-center justify-center border-none">
          <TypographyH2 className="border-none">
            Are you sure you want to log out?
          </TypographyH2>
          <AuthLogoutButton variant="default">
            Yes, sign me out
          </AuthLogoutButton>
        </Card>
      </Container>
    </Layout>
  );
};

export default LogoutPage;
