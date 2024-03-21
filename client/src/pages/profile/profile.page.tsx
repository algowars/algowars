import { formatDateAlt } from "@/common/date-format/format-date";
import PageLoader from "@/components/loader/page-loader/page-loader";
import { Card } from "@/components/ui/card";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { accountService } from "@/features/account/services/account.service";
import ProfileSubmissions from "@/features/profile/profile-submissions/profile-submissions";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useAppSelector } from "@/store/use-app-selector";
import { useQuery } from "@tanstack/react-query";
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

      return accountService.getProfileByUsername(username);
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }

  console.log(account, profile);

  return (
    <>
      <ErrorAlertFixed error={error} />
      <Layout>
        <Container className="py-5 grid grid-cols-12 gap-5">
          <div className="col-span-8 flex flex-col gap-5">
            {profile ? (
              <Card className="p-5">
                <h3 className="text-xl font-semibold">{profile.username}</h3>
                <p className="text-sm text-muted-foreground">
                  Joined on {formatDateAlt(profile.joinedOn)}
                </p>
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
