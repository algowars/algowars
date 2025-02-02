import AuthenticatedComponent from "@/components/auth/authenticated-component/authenticated-component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useCreateSoloRush } from "../../api/create-solo-rush";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

export const CreateSoloProblemRushCard = () => {
  const { getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const createSoloRushMutation = useCreateSoloRush({
    mutationConfig: {
      onSuccess: (id: string) => {
        navigate(routerConfig.soloRush.execute(id));
      },
      onError: (error) => {
        toast.error(`Error creating game: "${error.message}"`);
      },
    },
  });

  const createSoloRush = async () => {
    const accessToken = await getAccessTokenSilently();
    createSoloRushMutation.mutate({ accessToken });
  };

  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-3xl font-bold mb-1">Solo Problem Rush</h3>
        <p className="text-muted-foreground max-w-xl">
          Fast paced gamemode where you solve algorithm questions as fast as you
          can within a time limit.
        </p>
      </div>
      <AuthenticatedComponent
        notAuthenticatedComponent={
          <div>
            <p className="text-muted-foreground mb-2">
              You need to be logged in to play.
            </p>
            <Button variant="default" className="w-32" disabled>
              <FontAwesomeIcon icon={faLock} />
              <span className="ml-1">Create Game</span>
            </Button>
          </div>
        }
        partiallyAuthenticatedComponent={
          <div>
            <p className="text-muted-foreground mb-2">
              You need to finish setting up your account to play.
            </p>
            <Button variant="default" className="w-32" disabled>
              <FontAwesomeIcon icon={faLock} />
              <span className="ml-1">Create Game</span>
            </Button>
          </div>
        }
      >
        <Button
          variant="default"
          className="w-32"
          onClick={createSoloRush}
          disabled={createSoloRushMutation.isPending}
        >
          {createSoloRushMutation.isPending ? "Loading..." : "Create Game"}
        </Button>
      </AuthenticatedComponent>
    </Card>
  );
};
