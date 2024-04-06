import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const RushCard = () => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold">Rush</h3>
        <p>Solve algorithm questions as fast as you can.</p>
      </div>
      <div>
        <Link to="/rush" className={cn(buttonVariants({ variant: "default" }))}>
          Algo Rush
        </Link>
      </div>
    </Card>
  );
};

export default RushCard;
