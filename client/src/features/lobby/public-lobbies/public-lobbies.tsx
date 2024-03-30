import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { lobbyService } from "../services/lobby-service";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";

const PublicLobbies = () => {
  const [date] = useState<Date>(new Date());
  const navigate = useNavigate();

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      return lobbyService.getPublicLobbiesPageable(1, 15, date);
    },
  });

  const joinGame = (gameId: string) => {
    navigate(`/battle/${gameId}`);
  };

  return (
    <Card>
      <div className="p-5 border-b">
        <ErrorAlert error={error} />
        <h3 className="font-semibold text-lg">Public Lobbies</h3>
      </div>

      {games ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lobby Name</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.results.length ? (
              games.results.map((game) =>
                game.lobby ? (
                  <TableRow key={game.id} onClick={() => joinGame(game.id)}>
                    <TableCell className="font-semibold">
                      {game.lobby.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{`${
                      game.lobby.players?.length ?? 0
                    }/ ${game.lobby.maxPlayers}`}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {game.duration} Minutes
                    </TableCell>
                    <TableCell className="text-muted-foreground font-semibold">
                      {game.status ? game.status.status : "Yet to start"}
                    </TableCell>
                    <TableCell>
                      <Link to={`/battle/${game.id}`}>Join Game</Link>
                    </TableCell>
                  </TableRow>
                ) : null
              )
            ) : (
              <TableRow>
                <TableCell className="font-semibold">
                  No Lobbies Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <p>No lobbies available</p>
      )}
      {isLoading ? <p className="font-semibold">Loading...</p> : null}
    </Card>
  );
};

export default PublicLobbies;
