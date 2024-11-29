export enum Judge0Status {
  IN_QUEUE = 'In Queue',
  PROCESSING = 'Processing',
  ACCEPTED = 'Accepted',
  WRONG_ANSWER = 'Wrong Answer',
  TIME_LIMIT_EXCEED = 'Time Limit Exceeded',
  COMPILATION_ERROR = 'Compilation Error',
  RUNTIME_ERROR_SIGSEGV = 'Runtime Error (SIGSEGV)',
  RUNTIME_ERROR_SIGXFSZ = 'Runtime Error (SIGXFSZ)',
  RUNTIME_ERROR_SIGFPE = 'Runtime Error (SIGFPE)',
  RUNTIME_ERROR_SIGABRT = 'Runtime Error (SIGABRT)',
  RUNTIME_ERROR_NZEC = 'Runtime Error (NZEC)',
  RUNTIME_ERROR_Other = 'Runtime Error (Other)',
}

export const RUNTIME_ERROR_STATUSES = [
  Judge0Status.RUNTIME_ERROR_SIGSEGV,
  Judge0Status.RUNTIME_ERROR_SIGXFSZ,
  Judge0Status.RUNTIME_ERROR_SIGFPE,
  Judge0Status.RUNTIME_ERROR_SIGABRT,
  Judge0Status.RUNTIME_ERROR_NZEC,
  Judge0Status.RUNTIME_ERROR_Other,
];
