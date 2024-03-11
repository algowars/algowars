import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CreateTestSetup = () => {
  const [setup, setSetup] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["get-setup"],
    queryFn: async () => {
      
    },
  });

  const changeSetup = (value: string) => {
    setSetup(value);
  };
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-5">
        <Card className="p-5 flex flex-col gap-5">
          <h3>Code Setup</h3>

          <Textarea
            placeholder="test setup"
            value={setup}
            onChange={(e) => changeSetup(e.target.value)}
          />
          <div>
            <Button>Create Test Setup</Button>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default CreateTestSetup;
