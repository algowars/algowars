import CodeRushHeader from "@/features/code-rush/code-rush-header/code-rush-header";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const CodeRushPage = () => {
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-6">
        <CodeRushHeader />
      </Container>
    </Layout>
  );
};

export default CodeRushPage;
