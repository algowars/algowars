export interface CreateEvaluatorSubmission {
  language_id: number;
  source_code: string;
  expected_output: string;
  stdin: string;
}
