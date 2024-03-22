import BattleHeader from "@/features/battle/battle-header/battle-header";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const BattlePage = () => {
  return (
    <Layout>
      <BattleHeader />
      <Container className="py-6"></Container>
    </Layout>
  );
};

export default BattlePage;
