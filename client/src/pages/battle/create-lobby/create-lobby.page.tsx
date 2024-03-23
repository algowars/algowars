import BattleCreateLobby from "@/features/battle/battle-create-lobby/battle-create-lobby";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const CreateLobbyPage = () => {
  return (
    <Layout>
      <Container className="py-6 flex flex-col gap-6">
        <BattleCreateLobby />
      </Container>
    </Layout>
  );
};

export default CreateLobbyPage;
