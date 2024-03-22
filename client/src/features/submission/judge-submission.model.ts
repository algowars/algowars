import { SubmissionStatus } from "./judge-submission-status.model";

export interface JudgeSubmission {
  id: number;
  stdout: string | null;
  time: null;
  memory: null;
  stdin: string | null;
  stderr: string | null;
  token: string;
  compile_outpu: null;
  message: null;
  status: SubmissionStatus;
  expected_output?: string;
}
