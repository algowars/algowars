import AuthenticatedComponent from "@/components/auth/authenticated-component/authenticated-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useCreateSoloRush } from "../../api/create-solo-rush";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router-config";
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
    <Card className="bg-sidebar">
      <CardHeader>
        <CardTitle>Solo Problem Rush</CardTitle>
        <CardDescription>
          Fast paced gamemode where you solve algorithm questions as fast as you
          can within a given time limit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthenticatedComponent
          notAuthenticatedComponent={
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                You need to be logged in to play.
              </p>
              <Button variant="default" className="w-32" disabled>
                <FontAwesomeIcon icon={faLock} />
                <span className="ml-4">Create Game</span>
              </Button>
            </div>
          }
          partiallyAuthenticatedComponent={
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                You need to finish setting up your account to play.
              </p>
              <Button variant="default" className="w-32" disabled>
                <FontAwesomeIcon icon={faLock} />
                <span className="ml-4">Create Game</span>
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
      </CardContent>
    </Card>
  );
};
