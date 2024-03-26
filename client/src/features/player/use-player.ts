import { storage } from "@/common/storage/storage";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useQuery } from "@tanstack/react-query";
import { playerService } from "./services/player-service";
import { useEffect } from "react";
import { setPlayer } from "@/slices/player-slice";

export const usePlayer = () => {
  const dispatch = useAppDispatch();

  const response = useQuery({
    queryKey: ["player"],
    queryFn: async () => {
      const playerId = storage.get("playerId");

      if (playerId) {
        return playerService.getPlayerById(playerId);
      }
      return null;
    },
  });

  useEffect(() => {
    if (response.data) {
      dispatch(setPlayer(response.data));
    }
  }, [response.data, dispatch]);

  return response;
};
