import { routerConfig } from "@/app/router-config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Account } from "@/features/account/models/account.model";
import { cn } from "@/lib/utils";
import defaultPfp from "/pfp/default-pfp.png";

type ProblemEditorCreatedByProps = {
  createdBy?: Account;
};

export const ProblemEditorCreatedBy = ({
  createdBy,
}: ProblemEditorCreatedByProps) => {
  if (!createdBy) {
    return null;
  }

  return (
    <Link
      to={routerConfig.profile.execute(createdBy.username)}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex text-sm w-fit p-2 h-9 rounded-full -ml-1 gap-2"
      )}
    >
      <Avatar className="w-7 h-7">
        <AvatarImage src={createdBy?.picture} />
        <AvatarFallback>
          <img
            src={defaultPfp}
            alt="Default Profile"
            className="h-full w-full object-cover"
          />
        </AvatarFallback>
      </Avatar>{" "}
      <span className="font-semibold">{createdBy.username}</span>
    </Link>
  );
};
