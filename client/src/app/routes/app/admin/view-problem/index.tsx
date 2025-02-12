import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminProblemBySlug } from "@/features/admin/api/get-admin-problem-by-slug";
import { useAuth0 } from "@auth0/auth0-react";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const AdminViewProblemRoute = () => {
  const { slug = "" } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");

  const adminProblemQuery = useGetAdminProblemBySlug({
    accessToken,
    slug,
  });

  useEffect(() => {
    if (adminProblemQuery.isError) {
      let errorMessage: string;
      if (isAxiosError(adminProblemQuery.error)) {
        errorMessage =
          adminProblemQuery.error.response?.data?.message ||
          adminProblemQuery.error.message;
      } else {
        errorMessage = (adminProblemQuery.error as Error).message;
      }
      toast(`Error getting challenge: "${errorMessage}"`);
    }
  }, [adminProblemQuery.error, adminProblemQuery.isError]);

  useEffect(() => {
    (async () => {
      if (!accessToken) {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      }
    })();
  }, [accessToken, getAccessTokenSilently]);

  if (!slug || !adminProblemQuery.data) {
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
          href: routerConfig.admin.path,
          name: "Admin",
        },
        {
          href: routerConfig.adminViewProblem.execute(slug),
          name: slug,
        },
      ]}
    >
      <section className="px-3">
        <Card className="bg-sidebar">
          <CardHeader>
            <CardTitle>{adminProblemQuery.data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>TESTING</h1>
          </CardContent>
        </Card>
      </section>
    </SidebarLayout>
  );
};
