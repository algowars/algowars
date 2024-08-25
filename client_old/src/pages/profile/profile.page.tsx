import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { slug } = useParams();
  return (
    <Layout>
      <Container className="py-10">
        <h1>TESTING</h1>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
