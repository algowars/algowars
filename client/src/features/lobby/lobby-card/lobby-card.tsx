import { Card } from "@/components/ui/card";
import { Lobby } from "../lobby";

type Props = {
  lobby?: Lobby | undefined;
};

const LobbyCard = ({ lobby }: Props) => {
  if (!lobby) {
    return null;
  }

  return (
    <Card className="p-5">
      <h3 className="text-xl font-semibold">{lobby.name}</h3>
    </Card>
  );
};

export default LobbyCard;
