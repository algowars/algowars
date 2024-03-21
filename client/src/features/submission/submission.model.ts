import { SubmissionStatus } from "./submission-status.model";

export interface Submission {
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
}
