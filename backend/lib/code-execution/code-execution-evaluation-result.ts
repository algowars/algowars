import { SubmissionStatus } from 'src/submission/domain/submission-status';

export enum SubmissionResultStatus {
  IN_QUEUE = 'In Queue',
  PROCESSING = 'Processing',
  ACCEPTED = 'Accepted',
  WRONG_ANSWER = 'Wrong Answer',
  TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
  COMPILATION_ERROR = 'Compilation Error',
  INTERNAL_ERROR = 'Internal Error',
  EXEC_FORMAT_ERROR = 'Exec Format Error',
  RUNTIME_ERROR = 'Runtime Error',
}

export interface CodeExecutionEvaluationResult {
  status: SubmissionStatus;
  stdout: string;
  summary: {
    passed: number;
    failed: number;
    skipped: number;
    details: string[];
  };
}
