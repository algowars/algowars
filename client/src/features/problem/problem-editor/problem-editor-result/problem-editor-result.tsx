type ProblemEditorProps = {
  submissionId?: string;
  submissionUpdate: {
    status: string;
    stdout: string[];
  } | null;
};

export const ProblemEditorResult = ({
  submissionId,
  submissionUpdate,
}: ProblemEditorProps) => {
  if (!submissionId || !submissionUpdate) {
    return null;
  }

  return (
    <div className="p-5 bg-zinc-900">
      {submissionUpdate ? (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Status: {submissionUpdate.status}
          </h3>
          <h4 className="font-semibold">Output:</h4>
          <pre>{submissionUpdate.stdout.join("\n")}</pre>
        </div>
      ) : (
        <p>Waiting for submission updates...</p>
      )}
    </div>
  );
};
