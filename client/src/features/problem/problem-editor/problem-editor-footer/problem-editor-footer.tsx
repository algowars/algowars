import { Button, buttonVariants } from "@/components/ui/button";
import { useAccountStore } from "@/features/account/account-store.provider";
import { cn } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

type ProblemEditorFooterProps = {
  onSubmit: () => void;
};

export const ProblemEditorFooter = ({ onSubmit }: ProblemEditorFooterProps) => {
  const { isAuthenticated: isAuthAuthenticated } = useAuth0();
  const { isAuthenticated } = useAccountStore();

  const isAccountCreated = !isAuthAuthenticated || !isAuthenticated;

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
          <Button
            variant="secondary"
            className="w-28"
            disabled={isAccountCreated}
          >
            Run
          </Button>
        </li>
        <li>
          <Button
            className="w-28"
            onClick={() => onSubmit()}
            disabled={isAccountCreated}
          >
            Submit
          </Button>
        </li>
      </ul>
    </footer>
  );
};
