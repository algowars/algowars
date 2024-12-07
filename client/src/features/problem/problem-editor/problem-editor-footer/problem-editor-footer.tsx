import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type ProblemEditorFooterProps = {
  onSubmit: () => void;
};

export const ProblemEditorFooter = ({ onSubmit }: ProblemEditorFooterProps) => {
  return (
    <footer className="flex items-center px-5 pb-5">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Link
            to="solutions"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            View Solutions
          </Link>
        </li>
        <li>
          <Button variant="secondary" className="w-28">
            Run
          </Button>
        </li>
        <li>
          <Button className="w-28" onClick={() => onSubmit()}>
            Submit
          </Button>
        </li>
      </ul>
    </footer>
  );
};
