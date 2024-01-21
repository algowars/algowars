import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/layout/container/Container";
import Layout from "@/layout/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <Container className="py-5">
        <Card className="flex flex-col gap-5 p-5">
          <h3 className="text-2xl font-semibold">Solve Problem</h3>
          <div>
            <Link className={buttonVariants()} to="/problem">
              Go to Problem
            </Link>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default HomePage;
