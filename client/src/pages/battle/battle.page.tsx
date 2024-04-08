import BattleNotFound from "@/features/battle/battle-not-found/battle-not-found";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";

const BattlePage = () => {
  const { gameId } = useParams();
  const {
    data: game,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => {
      return null;
    },
  });

  if (!game && !isLoading) {
    return <BattleNotFound />;
  }

  return <Outlet />;
};

export default BattlePage;
