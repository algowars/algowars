import Container from "@/layout/container/Container";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <Container className="py-10">
        <div className="flex items-center flex-col gap-5 max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold">Page Not Found</h1>
          <p className="dark:text-slate-400 text-slate-500 max-w-xl text-center">
            Uh oh, we can't seem to find the page you're looking for. Try going
            back to the previous page or to the home page.
          </p>
          <Link className={buttonVariants()} to="/">
            Go Home
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFound;
