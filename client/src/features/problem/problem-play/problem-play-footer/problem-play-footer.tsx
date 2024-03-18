import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const ProblemPlayFooter = () => {
  return (
    <div className="border-t p-3 flex items-center gap-5">
      <ul className="flex gap-3 items-center ml-auto">
        <li>
          <Button className="w-24" variant="outline">
            Run
          </Button>
        </li>
        <li>
          <Button disabled className="w-28">
            <Lock size={17} className="mr-3" />
            Submit
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ProblemPlayFooter;
