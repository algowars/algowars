import { Card } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const AdminCreate = () => {
  return (
    <Layout>
      <Container className="py-5">
        <Card className="p-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Admin Create</h1>
        </Card>
      </Container>
    </Layout>
  );
};

export default AdminCreate;
