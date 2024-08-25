export interface CreateJudgeSubmission {
  // The ID representing the programming language to be used for the submission
  language_id: number;

  // The source code that will be compiled and executed
  source_code: string;

  // The expected output that the submission should produce when executed
  expected_output: string;

  // The standard input to be provided to the program during execution
  stdin: string;
}
