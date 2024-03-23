import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";

const BattleCreateLobby = () => {
  const {
    mutate: createLobby,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-lobby"],
    mutationFn: async () => {},
  });
  return (
    <Card className="p-3 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold">Create Lobby</h2>
      </div>
      <form className="flex flex-col gap-5">
        <div>
          <Button>Create Lobby</Button>
        </div>
      </form>
    </Card>
  );
};

export default BattleCreateLobby;
