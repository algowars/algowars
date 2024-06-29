import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubmissionResultTestcase {
  @IsString()
  @IsNotEmpty()
  token: string;

  order?: number;

  isRandomTestcase?: boolean;

  sourceCode?: string;

  stdin?: string;

  stdout?: string;

  expectedOutput?: string;

  statusId?: number;

  stderr?: string;
}
