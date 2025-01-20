import AuthenticatedComponent from "@/components/auth/authenticated-component/authenticated-component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export const CreateSoloProblemRushCard = () => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-3xl font-bold mb-1">Solo Problem Rush</h3>
        <p className="text-muted-foreground max-w-xl">
          Fast paced gamemode where you solve algorithm questions as fast as you
          can withing a time limit.
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
        <Button variant="default" className="w-32">
          Create Game
        </Button>
      </AuthenticatedComponent>
    </Card>
  );
};
