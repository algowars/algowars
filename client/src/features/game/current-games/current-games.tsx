import { useState } from "react";
import { useGetUserGamesByUsername } from "../api/get-user-games-by-username";
import { Loader } from "@/components/loader/loader";

type CurrentGamesProps = {
  username: string;
};

export const CurrentGames = ({ username }: CurrentGamesProps) => {
  const [page] = useState<number>(1);
  const [size] = useState<number>(10);
  const [timestamp] = useState<Date>(new Date());
  const getUserGamesQuery = useGetUserGamesByUsername({
    username,
    page,
    size,
    timestamp,
  });

  if (!getUserGamesQuery.data) {
    return (
      <div className="p-5 text-center">
        <h4>No Games Available</h4>
      </div>
    );
  }

  if (getUserGamesQuery.isPending) {
    return <Loader />;
  }

  return (
    <ul className="flex flex-col gap-5">
      {getUserGamesQuery.data?.map((game) => <li key={game.id}>oi</li>)}
    </ul>
  );
};
