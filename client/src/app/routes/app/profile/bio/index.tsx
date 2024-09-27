import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useFindAccountByUsername } from "@/features/account/api/find-account-by-username";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccountStore } from "@/features/account/account-store.provider";

export const ProfileBioRoute = () => {
  const { isAuthenticated: isAuthAuthenticated } = useAuth0();
  const { isAuthenticated } = useAccountStore();

  const { username } = useParams();

  const accountQuery = useFindAccountByUsername({
    username: username as string,
  });

  if (accountQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const account = accountQuery?.data;

  if (!account) {
    return null;
  }

  return (
    <Layout isAuthenticated={isAuthAuthenticated || isAuthenticated}>
      <Container className="py-12">
        <Card className="p-5 flex flex-col gap-5">
          <h2>{account.username}</h2>

          <p>Created on {dayjs(account.createdAt).format("DD/MM/YYYY")}</p>
        </Card>
      </Container>
    </Layout>
  );
};
