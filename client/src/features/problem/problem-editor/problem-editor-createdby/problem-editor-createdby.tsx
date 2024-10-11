import { routerConfig } from "@/app/router";
import { Link } from "@/components/ui/link";
import { Account } from "@/features/account/models/account.model";

type ProblemEditorCreatedByProps = {
  createdBy?: Account | undefined;
};

export const ProblemEditorCreatedBy = ({
  createdBy,
}: ProblemEditorCreatedByProps) => {
  if (!createdBy) {
    return null;
  }

  return (
    <span>
      CreatedBy:{" "}
      <Link to={routerConfig.profile.execute(createdBy.username)}>
        {createdBy.username}
      </Link>
    </span>
  );
};
