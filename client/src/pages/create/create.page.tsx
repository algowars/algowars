import { Card } from "@/components/ui/card";
import CreateNav from "@/features/create/create-nav/create-nav";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { Outlet } from "react-router-dom";

const CreatePage = () => {
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-3">
        <CreateNav />
        <Card className="p-5">
          <Outlet />
        </Card>
      </Container>
    </Layout>
  );
};

export default CreatePage;
