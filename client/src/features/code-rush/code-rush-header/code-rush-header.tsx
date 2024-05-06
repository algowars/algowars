import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { codeRushService } from "../services/code-rush.service";
import TypographyH3 from "@/components/ui/typography/typography-h3";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import { useNavigate } from "react-router-dom";

const CodeRushHeader = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const {
    mutate: createGame,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-game"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      const rush = await codeRushService.createRush(accessToken);

      if (!rush) {
        throw new Error("Error Creating a Code Rush Game");
      }

      navigate(`/rush/${encodeURIComponent(rush.id)}`);
    },
  });

  return (
    <Card className="p-5 flex flex-col gap-5">
      <ErrorAlert error={error} />
      <header>
        <TypographyH3>Code Rush</TypographyH3>
      </header>
      <TypographyMuted>
        Dive into the Code Rush Challenge and solve as many algorithm puzzles as
        you can! Enhance your coding skills, speed up your problem-solving, and
        aim for the top of the leaderboard. Ready to prove your prowess?
      </TypographyMuted>
      <div>
        <Button onClick={() => createGame()} disabled={isPending}>
          Create Game
        </Button>
      </div>
    </Card>
  );
};

export default CodeRushHeader;
