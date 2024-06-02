import { Button } from "@/components/ui/button";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";

type Props = {
  game: Game;
  player: Player;
};

const isGameCreator = (game: Game, player: Player): boolean => {
  return true;
};

const LobbyActionsStartGame = ({ game, player }: Props) => {
  return <Button>Start Game</Button>;
};

export default LobbyActionsStartGame;
