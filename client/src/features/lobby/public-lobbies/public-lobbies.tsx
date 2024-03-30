import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { lobbyService } from "../services/lobby-service";

const PublicLobbies = () => {
  const [date] = useState<Date>(new Date());

  const {
    data: lobbies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lobbies"],
    queryFn: async () => {
      return lobbyService.getPublicLobbiesPageable(1, 15, date);
    },
  });
  return lobbies ? (
    <ul>
      {lobbies.results.map((lobby) => (
        <li>{lobby.name}</li>
      ))}
    </ul>
  ) : (
    <p>No lobbies available</p>
  );
};

export default PublicLobbies;
