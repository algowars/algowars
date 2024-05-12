import { formatDateAlt } from "@/common/date-format/format-date";
import PageLoader from "@/components/loader/page-loader/page-loader";
import { Card } from "@/components/ui/card";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { playerService } from "@/features/player/services/player-service";
import ProfileSubmissions from "@/features/profile/profile-submissions/profile-submissions";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useAppSelector } from "@/store/use-app-selector";
import { useQuery } from "@tanstack/react-query";
import { Cake, ExternalLink, LocateIcon, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const { account } = useAppSelector((state) => state.account);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!username) {
        throw new Error("Profile requires a username");
      }

      return playerService.getPlayerByUsername(username);
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <ErrorAlertFixed error={error} />
      <Layout>
        <Container className="py-5 grid grid-cols-12 gap-5">
          <div className="col-span-8 flex flex-col gap-5">
            {profile ? (
              <Card className="p-5">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profile.username}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.bio}
                    </p>
                  </div>

                  <ul className="flex items-center gap-5">
                    {profile.location ? (
                      <li>
                        <TypographyMuted className="flex gap-2 items-center">
                          <MapPin />
                          <span>{profile.location}</span>
                        </TypographyMuted>
                      </li>
                    ) : null}
                    {profile.createdAt ? (
                      <li>
                        <TypographyMuted className="flex gap-2 items-center">
                          <Cake />
                          <span>
                            Joined on {formatDateAlt(profile.createdAt)}
                          </span>
                        </TypographyMuted>
                      </li>
                    ) : null}
                    {profile.websiteUrl ? (
                      <li>
                        <TypographyMuted className="flex gap-2 items-center">
                          <ExternalLink />
                          <a
                            href={profile.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-2"
                          >
                            {profile.websiteUrl}
                          </a>
                        </TypographyMuted>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </Card>
            ) : null}
            {account.username === profile?.username ? (
              <ProfileSubmissions />
            ) : null}
          </div>
          <aside className="col-span-4 flex flex-col gap-5">
            <Card>
              <h4>TEST</h4>
            </Card>
          </aside>
        </Container>
      </Layout>
    </>
  );
};

export default ProfilePage;
