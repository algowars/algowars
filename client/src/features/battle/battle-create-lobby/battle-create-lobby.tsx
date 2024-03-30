import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { lobbyService } from "@/features/lobby/services/lobby-service";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useAppSelector } from "@/store/use-app-selector";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const BattleCreateLobby = () => {
  const { player } = useAppSelector((state) => state.player);
  const [lobbyName, setLobbyName] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate: createLobby,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-lobby"],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const accessToken = await getAccessTokenSilently();

      const game = await lobbyService.createLobby(accessToken, lobbyName);

      if (!game) {
        throw new Error("Error creating lobby");
      }

      navigate(`/battle/${game.id}`);

      return null;
    },
  });

  return (
    <Card className="p-3 flex flex-col gap-5">
      <ErrorAlert error={error} />
      <div>
        <h2 className="text-xl font-semibold">Create Lobby</h2>
      </div>
      <form className="flex flex-col gap-5" onSubmit={(e) => createLobby(e)}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Lobby Name</Label>
          <Input
            id="name"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            placeholder="Lobby Name"
          />
        </div>
        <div>
          <Button type="submit" disabled={isPending}>
            Create Lobby
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BattleCreateLobby;
