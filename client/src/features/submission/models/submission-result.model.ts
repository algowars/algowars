export interface SubmissionResult {
  token: string;
  sourceCode?: string;
  languageId?: number;
  stdin?: string;
  stdout?: string;
  time?: string;
  memory: number;
  stderr?: string | null;
  expectedOutput?: string;
  message?: string;
  status?: {
    id: number;
    description: string;
  };
}
