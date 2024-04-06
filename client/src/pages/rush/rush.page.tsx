import RushHeader from "@/features/rush/rush-header/rush-header";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const RushPage = () => {
  return (
    <Layout>
      <RushHeader />
      <Container className="py-6"></Container>
    </Layout>
  );
};

export default RushPage;
