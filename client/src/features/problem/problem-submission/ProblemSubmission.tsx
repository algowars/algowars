import { SubmissionModel } from "@/models/SubmissionModel";

type Props = {
  submission: SubmissionModel | null;
};

const ProblemSubmission = ({ submission }: Props) => {
  if (!submission) {
    return null;
  }

  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-scroll">
      {submission.stdin ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm">Input</p>
          <div className="p-3 bg-slate-900 rounded">
            <p>{submission.stdin}</p>
          </div>
        </div>
      ) : null}
      {submission.stdout ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm">Output</p>
          <div className="p-3 bg-slate-900 rounded">
            <p>{submission.stdout}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProblemSubmission;
