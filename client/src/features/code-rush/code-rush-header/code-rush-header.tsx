import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { codeRushService } from "../services/code-rush.service";

const CodeRushHeader = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutate: createGame,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-game"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return codeRushService.createRush(accessToken);
    },
  });

  return (
    <Card className="p-5 flex flex-col gap-5">
      <ErrorAlert error={error} />
      <header>
        <h3 className="text-2xl font-bold">Code Rush</h3>
      </header>
      <p className="text-muted-foreground">
        Dive into the Code Rush Challenge and solve as many algorithm puzzles as
        you can! Enhance your coding skills, speed up your problem-solving, and
        aim for the top of the leaderboard. Ready to prove your prowess?
      </p>
      <div>
        <Button onClick={() => createGame()} disabled={isPending}>
          Create Game
        </Button>
      </div>
    </Card>
  );
};

export default CodeRushHeader;
