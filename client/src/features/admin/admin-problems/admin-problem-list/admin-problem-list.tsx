import { Problem } from "@/features/problem/models/problem.model";
import { AdminProblemListCard } from "./admin-problem-list-card/admin-problem-list-card";
import { SubmissionStatus } from "@/features/submission/models/submission-status";

type AdminProblemListProps = {
  problems: Array<
    Problem & {
      setupStatuses: {
        name: string;
        status: SubmissionStatus;
      }[];
    }
  >;
};

export const AdminProblemList = ({ problems }: AdminProblemListProps) => {
  if (!Array.isArray(problems) || !problems.length) {
    return <p>No Problems Available</p>;
  }

  return (
    <ul className="flex flex-col gap-5">
      {problems.map((problem) => (
        <li key={problem.id}>
          <AdminProblemListCard problem={problem} />
        </li>
      ))}
    </ul>
  );
};
