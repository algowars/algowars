import ButtonLightOutline from "../../components/button/button-light-outline/ButtonLightOutline";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import Layout from "../../layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Container className="py-10">
        <Card className="flex items-center flex-col gap-5 max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold">Page Not Found</h1>
          <p className="dark:text-slate-400 text-slate-500 max-w-xl text-center">
            Uh oh, we can't seem to find the page you're looking for. Try going
            back to the previous page or to the home page.
          </p>
          <ButtonLightOutline>Go Home</ButtonLightOutline>
        </Card>
      </Container>
    </Layout>
  );
};

export default NotFound;
