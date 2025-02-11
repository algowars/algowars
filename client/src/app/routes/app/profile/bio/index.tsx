import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useFindAccountByUsername } from "@/features/account/api/find-account-by-username";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UserSubmissions } from "@/features/submission/user-submissions/user-submissions";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { routerConfig } from "@/app/router-config";
import { AccountStats } from "@/features/account/account-stats/account-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultPfp from "/pfp/default-pfp.png";

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
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.profile.path,
          name: `${username}'s Profile`,
        },
      ]}
    >
      <section className="px-3 grid grid-cols-12 gap-3">
        <Card className="bg-sidebar col-span-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={account?.picture} />
                <AvatarFallback>
                  <img
                    src={defaultPfp}
                    alt="Default Profile"
                    className="h-full w-full object-cover"
                  />
                </AvatarFallback>
              </Avatar>{" "}
              {account.username}
            </CardTitle>
            <CardDescription>
              Created on {dayjs(account.createdAt).format("DD/MM/YYYY")}
            </CardDescription>
          </CardHeader>
          <h2 className="font-bold text-2xl"></h2>
          {/* {profileRank ? <PlayerRankBadge elo={profileRank.elo} /> : null} */}
        </Card>
        <Card className="bg-sidebar col-span-9">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <UserSubmissions submissions={account.recentSubmissions} />
          </CardContent>
        </Card>
        <AccountStats className="col-span-3" />
        <Card className="bg-sidebar col-span-9">
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </section>
    </SidebarLayout>
  );
};
