import Layout from "@/layout/layout";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AdminPage;
