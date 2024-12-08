import { ProblemStatus } from "@/features/problem/models/problem-status";

type AdminProblemListCardStatusProps = {
  status?: ProblemStatus;
};

export const AdminProblemListCardStatus = ({
  status,
}: AdminProblemListCardStatusProps) => {
  if (!status) {
    return null;
  }

  let className = "";

  if (status === ProblemStatus.ACCEPTED) {
    className += " text-green-500";
  } else if (status === ProblemStatus.PENDING) {
    className += " text-yellow-500";
  }

  return <p className={className}>{status}</p>;
};
