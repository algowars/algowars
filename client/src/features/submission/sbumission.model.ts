import { Account } from "../account/account.model";
import { JudgeSubmission } from "./judge-submission.model";

export interface Submission {
  id: string;
  judgeSubmissions?: JudgeSubmission[];
  createdBy?: Account;
  createdAt: Date;
  updatedAt: Date;
}
