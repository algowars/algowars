import CreateProblem from "@/features/create/create-problem/create-problem";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const CreatePage = () => {
  return (
    <Layout>
      <Container className="py-10">
        <CreateProblem />
      </Container>
    </Layout>
  );
};

export default CreatePage;
