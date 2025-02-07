import { routerConfig } from "@/app/router-config";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";

type ProblemEditorCreatedByProps = {
  createdBy?: string | undefined;
};

export const ProblemEditorCreatedBy = ({
  createdBy,
}: ProblemEditorCreatedByProps) => {
  if (!createdBy) {
    return null;
  }

  return (
    <Link
      to={routerConfig.profile.execute(createdBy)}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex text-sm w-fit p-1 -ml-1"
      )}
    >
      <CircleUserRound className="mr-1" size={18} /> {createdBy}
    </Link>
  );
};
