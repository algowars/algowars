import BattleHeader from "@/features/battle/battle-header/battle-header";
import PublicLobbies from "@/features/lobby/public-lobbies/public-lobbies";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const BattlePage = () => {
  return (
    <Layout>
      <BattleHeader />
      <Container className="pb-6">
        <PublicLobbies />
      </Container>
    </Layout>
  );
};

export default BattlePage;
