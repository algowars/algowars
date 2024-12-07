import { cn } from "@/lib/utils";
import { SubmissionStatus } from "../models/submission-status";

type SubmissionStatusViewProps = {
  status: SubmissionStatus;
};

export const SubmissionStatusView = ({ status }: SubmissionStatusViewProps) => {
  return (
    <span
      className={cn(
        status === SubmissionStatus.ACCEPTED
          ? "text-green-500"
          : "text-red-500",
        "text-lg font-semibold"
      )}
    >
      {status}
    </span>
  );
};
