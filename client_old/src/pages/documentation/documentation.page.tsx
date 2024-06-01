import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const DocumentationPage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-12" width="container">
        <aside className="border h-96 col-span-2"></aside>
        <section className="border h-96 col-span-8"></section>
        <aside className="border h-96 col-span-2"></aside>
      </Container>
    </Layout>
  );
};

export default DocumentationPage;
