import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { lobbyService } from "@/features/lobby/services/lobby-service";
import { playerService } from "@/features/player/services/player-service";
import { setPlayer } from "@/slices/player-slice";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useAppSelector } from "@/store/use-app-selector";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const BattleCreateLobby = () => {
  const { player } = useAppSelector((state) => state.player);
  const { account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate: createLobby,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-lobby"],
    mutationFn: async () => {
      console.log(player);
      if (!player.id) {
        const newPlayer = await playerService.createPlayer();
        dispatch(setPlayer(newPlayer));
      }

      if (player.id) {
        const lobby = await lobbyService.createLobby(player.id);

        if (!lobby) {
          throw new Error("Error creating lobby");
        }

        navigate(`/battle/lobby/${lobby.id}`);
      }

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
