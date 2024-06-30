import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  error: string | undefined;
};

const SubmissionResultError = ({ error }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpened((curr) => !curr);
  };

  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-400/10 text-red-400 rounded p-3 flex flex-col gap-1">
      <div className={`${isOpened ? "h-full" : "max-h-24"} overflow-hidden`}>
        {error}
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          className="h-8 p-0 w-28 hover:bg-red-400/10 hover:text-red-400"
          onClick={toggleOpen}
        >
          {isOpened ? "View less" : "View more"}
          <ChevronDown
            size={16}
            className={`ml-1 duration-200 ease-in${
              isOpened ? " rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

export default SubmissionResultError;
