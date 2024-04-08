import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { Link, useNavigate } from "react-router-dom";

const BattleNotStarted = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container className="py-6">
        <Card className="p-5 flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold">404</h2>
            <p className="text-muted-foreground text-lg">
              This Battle does not exist or is not available.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className={buttonVariants({ variant: "default" })}
            >
              Go Home
            </Link>
            <Button variant="outline" onClick={goBack}>
              Go Back
            </Button>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default BattleNotStarted;
