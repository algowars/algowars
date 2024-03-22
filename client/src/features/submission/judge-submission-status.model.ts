import { SubmissionStatusDescription } from "./judge-submission-status-description.model";

export interface SubmissionStatus {
  id: number;
  description: SubmissionStatusDescription;
}
