export enum JudgeSubmissionStatusDescription {
  IN_QUEUE = 'In Queue',
  PROCESSING = 'Processing',
  ACCEPTED = 'Accepted',
  WRONG_ANSWER = 'Wrong Answer',
  TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
  COMPILATION_ERROR = 'Compilation Error',
  RUNTIME_ERROR_SIGSEGV = 'Runtime Error (SIGSEGV)',
  RUNTIME_ERROR_SIGXFSZ = 'Runtime Error (SIGXFSZ)',
  RUNTIME_ERROR_SIGABRT = 'Runtime Error (SIGABRT)',
  RUNTIME_ERROR_NZEC = 'Runtime Error (NZEC)',
  INTERNAL_ERROR = 'Internal Error',
  EXEC_FORMAT_ERROR = 'Exec Format Error',
}
