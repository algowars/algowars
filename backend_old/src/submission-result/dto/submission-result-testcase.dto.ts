export class SubmissionResultTestcaseDto {
  readonly id: string;
  readonly order: number;
  readonly isRandomTestcase: boolean;
  readonly token: string;
  readonly sourceCode?: string;
  readonly stdin?: string;
  readonly stdout?: string;
  readonly expectedOutput?: string;
  readonly statusId?: number;
  readonly stderr?: string;
}
