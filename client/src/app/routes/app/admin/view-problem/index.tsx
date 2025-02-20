import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetAdminProblemBySlug } from "@/features/admin/api/get-admin-problem-by-slug";
import { formatDateWithYear } from "@/utils/format-date";
import { useAuth0 } from "@auth0/auth0-react";
import { isAxiosError } from "axios";
import { Pencil } from "lucide-react";
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
          <form>
            <CardHeader>
              <CardTitle>
                <Label>Title</Label>
                <br />
                {adminProblemQuery.data.title}
                <Button variant="ghost" className="text-muted-foreground">
                  <Pencil size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-10">
              <div>
                <Label>Question</Label>
                <br />
                <span className="text-muted-foreground">
                  {adminProblemQuery.data.question}
                  <Button variant="ghost" className="text-muted-foreground">
                    <Pencil size={16} />
                  </Button>
                </span>
              </div>
              <div>
                <Label>Slug</Label>
                <br />
                <span className="text-muted-foreground">
                  {adminProblemQuery.data.slug}
                  <Button variant="ghost" className="text-muted-foreground">
                    <Pencil size={16} />
                  </Button>
                </span>
              </div>
              <div>
                <Label>Difficulty</Label>
                <br />
                <span className="text-muted-foreground">
                  {adminProblemQuery.data.difficulty}
                  <Button variant="ghost" className="text-muted-foreground">
                    <Pencil size={16} />
                  </Button>
                </span>
              </div>
              <div>
                <Label>Created At</Label>
                <br />
                <span className="text-muted-foreground">
                  {formatDateWithYear(adminProblemQuery.data.createdAt)}
                </span>
              </div>
              <div>
                <Label>Updated At</Label>
                <br />
                <span className="text-muted-foreground">
                  {formatDateWithYear(adminProblemQuery.data.updatedAt)}
                </span>
              </div>
              <div>
                <Label>Version</Label>
                <br />
                <span className="text-muted-foreground">
                  {adminProblemQuery.data.version}
                </span>
              </div>
            </CardContent>
          </form>
        </Card>
      </section>
    </SidebarLayout>
  );
};
