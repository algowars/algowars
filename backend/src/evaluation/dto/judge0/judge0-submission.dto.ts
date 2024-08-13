export interface Judge0Submission {
  // A unique token identifying the submission, typically used to retrieve results
  token: string;

  // The source code that was submitted for execution
  source_code: string;

  // The ID representing the programming language in which the code is written
  language_id: number;

  // The standard input provided to the program during execution; can be null if no input is required
  stdin: string | null;

  // The expected output that the submission should produce; can be null if not applicable
  expected_output: string | null;

  // The actual output produced by the program upon execution
  stdout: string;

  // The status ID representing the outcome of the submission (e.g., success, compilation error, runtime error)
  status_id: number;

  // The timestamp when the submission was created
  created_at: string;

  // The timestamp when the submission's execution was completed
  finished_at: string;

  // The time taken by the submission to execute, typically in seconds or milliseconds
  time: string;

  // The amount of memory used by the submission during execution, usually in bytes or kilobytes
  memory: number;

  // The standard error output produced by the program during execution, capturing any errors or warnings
  stderr: string;
}
