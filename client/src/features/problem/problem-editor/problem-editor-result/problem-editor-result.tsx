import { CodeBlock } from "@/components/code-block/code-block";
import { Loader } from "@/components/loader/loader";

type ProblemEditorProps = {
  submissionId?: string;
  submissionUpdate: {
    status: string;
    stdout: string[];
  } | null;
};

const getStatusColor = (status: string): string => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === "correct") return "text-green-500";
  if (lowerStatus === "wrong answer" || lowerStatus === "incorrect")
    return "text-red-600 dark:text-red-400";
  return "text-primary";
};

export const ProblemEditorResult = ({
  submissionId,
  submissionUpdate,
}: ProblemEditorProps) => {
  if (!submissionId || !submissionUpdate) {
    return null;
  }

  return (
    <div className="p-5 bg-white dark:bg-zinc-900">
      {submissionUpdate ? (
        <div>
          <h3
            className={`text-xl font-semibold mb-3 ${getStatusColor(submissionUpdate.status)}`}
          >
            {submissionUpdate.status}
            {submissionUpdate.status === "Polling" ? (
              <Loader size="xs" />
            ) : null}
          </h3>
          {submissionUpdate.stdout && submissionUpdate.stdout.length > 0 ? (
            <div className="overflow-hidden rounded-lg border p-3 dark:p-0 dark:border-none">
              <CodeBlock code={submissionUpdate.stdout.join("\n") ?? ""} />
            </div>
          ) : (
            <p>No output available.</p>
          )}
        </div>
      ) : (
        <p>Waiting for submission updates...</p>
      )}
    </div>
  );
};
