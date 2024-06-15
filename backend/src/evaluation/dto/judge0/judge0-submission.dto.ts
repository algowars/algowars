export interface Judge0Submission {
  token: string;
  source_code: string;
  language_id: number;
  stdin: string | null;
  expected_output: string | null;
  stdout: string;
  status_id: number;
  created_at: string;
  finished_at: string;
  time: string;
  memory: number;
}
