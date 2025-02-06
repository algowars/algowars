import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useFindAccountByUsername } from "@/features/account/api/find-account-by-username";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UserSubmissions } from "@/features/submission/user-submissions/user-submissions";

export const ProfileBioRoute = () => {
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
    <Layout>
      <Container className="py-6 flex flex-col gap-3">
        <Card className="p-5 flex flex-col gap-5 bg-sidebar mb-5">
          <h2 className="font-bold text-2xl">{account.username}</h2>
          {/* {profileRank ? <PlayerRankBadge elo={profileRank.elo} /> : null} */}

          <p className="text-muted-foreground font-semibold">
            Created on {dayjs(account.createdAt).format("DD/MM/YYYY")}
          </p>
        </Card>
        <Card className="p-5  bg-sidebar">
          <h3 className="text-xl font-bold mb-2">Recent Submissions</h3>
          <UserSubmissions submissions={account.recentSubmissions} />
        </Card>
        {/* <div>
          <Card className="p-5 bg-zinc-100 dark:bg-zinc-900">
            <h3 className="text-xl font-bold">Games</h3>
          </Card>
          <CurrentGames username={account.username} />
        </div> */}
      </Container>
    </Layout>
  );
};
