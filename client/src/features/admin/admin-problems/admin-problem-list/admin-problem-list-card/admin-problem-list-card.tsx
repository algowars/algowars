import { Card } from "@/components/ui/card";
import { Problem } from "@/features/problem/models/problem.model";
import { SubmissionStatus } from "@/features/submission/models/submission-status";
import { AdminProblemListCardStatus } from "./admin-problem-list-card-status/admin-problem-list-card-status";

type AdminProblemListCardProps = {
  problem?: Problem & {
    setupStatuses: {
      name: string;
      status: SubmissionStatus;
    }[];
  };
};

export const AdminProblemListCard = ({
  problem,
}: AdminProblemListCardProps) => {
  if (!problem) {
    return null;
  }

  console.log(problem);

  return (
    <Card className="p-5 flex flex-col gap-3">
      <header className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">{problem.title}</h4>

        <AdminProblemListCardStatus status={problem?.status} />
      </header>
      <p className="text-muted-foreground text-sm">Slug: {problem.slug}</p>
      <div className="flex flex-col gap-2">
        <h5 className="font-semibold">Setup Statuses</h5>
        <ul className="text-sm text-muted-foreground">
          {problem.setupStatuses.map((status) => (
            <li key={status.name}>
              <p>{status.name}</p>
              <p>{status.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
