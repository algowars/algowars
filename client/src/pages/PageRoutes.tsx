import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../components/loader/page-loader/PageLoader";
import Layout from "../layout/Layout";

const PageRoutes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    <Layout>
      <PageLoader />
    </Layout>;
  }
  return <div>PageRoutes</div>;
};

export default PageRoutes;
