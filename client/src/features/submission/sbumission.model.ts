import { Account } from "../account/account.model";
import { JudgeSubmission } from "./judge-submission.model";

export interface Submission {
  id: number;
  judgeSubmissions?: JudgeSubmission[];
  createdBy?: Account;
  createdAt: Date;
  updatedAt: Date;
}
