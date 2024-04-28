import { JudgeSubmissionStatus } from './judge-submission-status';

export interface JudgeSubmission {
  stdout: null;
  time: null;
  memory: null;
  stderr: null;
  token: string;
  compile_outpu: null;
  message: null;
  status: JudgeSubmissionStatus;
}
