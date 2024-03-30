import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { lobbyService } from "@/features/lobby/services/lobby-service";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useAppSelector } from "@/store/use-app-selector";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BattleCreateLobby = () => {
  const { player } = useAppSelector((state) => state.player);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate: createLobby,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-lobby"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      const game = await lobbyService.createLobby(accessToken);

      if (!game) {
        throw new Error("Error creating lobby");
      }

      navigate(`/battle/${game.id}/lobby/${game.lobby.id}`);

      return null;
    },
  });

  return (
    <Card className="p-3 flex flex-col gap-5">
      <ErrorAlert error={error} />
      <div>
        <h2 className="text-xl font-semibold">Create Lobby</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => createLobby()}
          >
            Create Lobby
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BattleCreateLobby;
