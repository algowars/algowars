export class UpdateSubmissionResultTestcase {
  id?: string;
  order?: number;
  isRandomTestcase?: boolean;
  token: string;

  sourceCode: string;
  stdout: string;
  expectedOutput: string;
  statusId: number;
  stderr: string;
}
