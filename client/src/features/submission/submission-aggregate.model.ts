import { JudgeSubmission } from "./judge-submission.model";
import { Submission } from "./sbumission.model";

export interface SubmissionAggregate {
  submission: Submission;
  judgeSubmissions: JudgeSubmission[];
}
