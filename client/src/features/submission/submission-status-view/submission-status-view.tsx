import { cn } from "@/lib/utils";
import { SubmissionStatus } from "../models/submission-status";

type SubmissionStatusViewProps = {
  status: SubmissionStatus;
};

const statusColorMap: Record<SubmissionStatus, string> = {
  [SubmissionStatus.IN_QUEUE]: "text-yellow-500",
  [SubmissionStatus.PROCESSING]: "text-blue-500",
  [SubmissionStatus.ACCEPTED]: "text-green-500",
  [SubmissionStatus.WRONG_ANSWER]: "text-red-500",
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: "text-red-500",
  [SubmissionStatus.COMPILATION_ERROR]: "text-red-500",
  [SubmissionStatus.INTERNAL_ERROR]: "text-red-500",
  [SubmissionStatus.EXEC_FORMAT_ERROR]: "text-red-500",
  [SubmissionStatus.RUNTIME_ERROR]: "text-red-500",
  [SubmissionStatus.POLLING]: "text-gray-500",
  [SubmissionStatus.POLLING_ERROR]: "text-red-500",
};

export const SubmissionStatusView = ({ status }: SubmissionStatusViewProps) => {
  return (
    <span
      className={cn(
        statusColorMap[status] || "text-gray-500",
        "text-lg font-semibold"
      )}
    >
      {status}
    </span>
  );
};
