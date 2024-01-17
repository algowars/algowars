import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../components/loader/page-loader/PageLoader";
import Layout from "../layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import NotFound from "./not-found/NotFound";

const PageRoutes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    <Layout>
      <PageLoader />
    </Layout>;
  }
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
