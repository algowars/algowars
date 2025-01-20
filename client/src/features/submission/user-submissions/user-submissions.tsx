import { Card } from "@/components/ui/card";
import { useGetUserSubmissionsByUsername } from "../api/get-user-submissions-by-username";
import { CodeBlock } from "@/components/code-block/code-block";
import { SubmissionStatusView } from "../submission-status-view/submission-status-view";
import { Link } from "react-router-dom";
import { routerConfig } from "@/app/router";
import { formatDate } from "@/utils/format-date";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserSubmissionsProps = {
  username: string;
};

export const UserSubmissions = ({ username }: UserSubmissionsProps) => {
  const getUserSubmissionsQuery = useGetUserSubmissionsByUsername({ username });

  if (!getUserSubmissionsQuery.data) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-5">
      {getUserSubmissionsQuery.data?.submissions.map((sub) => (
        <li key={sub.id}>
          <Card className="p-5 bg-zinc-900 flex flex-col gap-3">
            <h4 className="text-2xl font-bold">
              <Link
                to={routerConfig.problem.execute(sub.problem?.slug)}
                className="hover:underline underline-offset-2"
              >
                {sub.problem?.title}
              </Link>
            </h4>
            {sub?.status ? <SubmissionStatusView status={sub.status} /> : null}
            <CodeBlock code={sub.sourceCode} className="rounded-lg" />
            <ul className="flex gap-1 items-center">
              <li>
                <p className="text-sm font-semibold text-muted-foreground">
                  {formatDate(sub.createdAt)}
                </p>
              </li>
              <li>
                <Link
                  to={routerConfig.problem.execute(sub.problem.slug)}
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Train Problem
                </Link>
              </li>
            </ul>
          </Card>
        </li>
      ))}
    </ul>
  );
};
