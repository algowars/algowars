import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export const NotFoundRoute = () => {
  return (
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.notFound.path,
          name: "Not Found",
        },
      ]}
    >
      <section className="flex justify-center items-center py-24">
        <div className="flex flex-col items-center justify-start text-center gap-2">
          <h2 className="text-2xl font-semibold">404 Page Not Found</h2>
          <p className="mb-3 text-muted-foreground">
            The link you followed probably broken or the page has been removed.
          </p>
          <Link
            to={routerConfig.root.path}
            className={buttonVariants({ variant: "default" })}
          >
            Go to home
          </Link>
        </div>
      </section>
    </SidebarLayout>
  );
};
