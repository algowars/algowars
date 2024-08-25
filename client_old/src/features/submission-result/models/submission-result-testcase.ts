export interface SubmissionResultTestcase {
  id: string;
  order: number;
  isRandomTestcase: boolean;
  token: string;
  sourceCode?: string;
  stdin?: string;
  stdout?: string;
  expectedOutput?: string;
  statusId?: number;
  stderr?: string;
}
