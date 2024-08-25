import Docs from "@/features/docs/docs";
import DocsAside from "@/features/docs/docs-aside/docs-aside";
import DocsNav from "@/features/docs/docs-nav/docs-nav";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const DocsPage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-12">
        <DocsNav className="p-5 border h-full col-span-2" />
        <Docs className="col-span-8 border" />
        <DocsAside className="col-span-2 border" />
      </Container>
    </Layout>
  );
};

export default DocsPage;
