import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-5">
        <Card className="p-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Admin Page</h1>
          <div>
            <Link
              to="create"
              className={buttonVariants({ variant: "default" })}
            >
              Create Problem
            </Link>
          </div>
        </Card>
        <Card className="p-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Create Test Setup</h1>
          <div>
            <Link
              to="create/test-setup"
              className={buttonVariants({ variant: "default" })}
            >
              Create Test Setup
            </Link>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default Admin;
