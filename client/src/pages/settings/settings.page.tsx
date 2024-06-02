import SettingsHeader from "@/features/settings/settings-header/settings-header";
import SettingsNav from "@/features/settings/settings-nav/settings-nav";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <Layout>
      <Container className="py-5">
        <SettingsHeader />
        <section className="grid grid-cols-12 gap-5">
          <aside className="col-span-3">
            <SettingsNav />
          </aside>
          <section className="col-span-9">
            <Outlet />
          </section>
        </section>
      </Container>
    </Layout>
  );
};

export default SettingsPage;
