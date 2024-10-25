import { Status } from './status';

export type SubmissionResultProperties = Readonly<{
  token: string;
}>;

export interface SubmissionResult {}

export class SumissionResultImplementation implements SubmissionResult {
  private readonly token: string;
  private readonly sourceCode: string;
  private readonly language_id: number;
  private readonly stdin?: string;
  private readonly stdout?: string;
  private readonly time: string;
  private readonly memory: number;
  private readonly stderr?: string | null;
  private readonly expectedOutput: string;
  private readonly message: string;
  private readonly status: Status;
}
