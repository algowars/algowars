import { routerConfig } from "@/app/router";
import { Layout } from "@/components/layouts/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export const NotFoundRoute = () => {
  return (
    <Layout>
      <section className="flex justify-center items-center py-24">
        <div className="flex flex-col items-center justify-start text-center gap-2">
          <h2 className="text-2xl font-semibold">404 Page Not Found</h2>
          <p className="mb-3 text-muted-foreground">
            The link you followed probably broken or the page has been removed.
          </p>
          <Link
            to={routerConfig.appRoot.path}
            className={buttonVariants({ variant: "default" })}
          >
            Go to home
          </Link>
        </div>
      </section>
    </Layout>
  );
};
