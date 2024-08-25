import Logo from "@/components/logo/logo";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <Layout>
      <Container className="border rounded my-5 p-0 grid grid-cols-2 h-full border">
        <aside className="p-10 col-span-1 bg-muted">
          <Logo />
        </aside>
        <main className="p-10 col-span-1 border-l flex flex-col">
          <Link
            to="/signup"
            className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
          >
            Sign up
          </Link>
          <form>
            <h2>Sign in to an account</h2>
          </form>
        </main>
      </Container>
    </Layout>
  );
};

export default SignInPage;
