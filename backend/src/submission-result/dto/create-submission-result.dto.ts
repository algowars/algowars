import { IsNumber } from 'class-validator';
import { SubmissionResultTestcase } from '../entities/submission-result-testcase.entity';
import { Account } from 'src/account/entities/account.entity';

export class CreateSubmissionResult {
  @IsNumber()
  languageId: number;

  createdAt: Date;

  updatedAt: Date;

  testcases: SubmissionResultTestcase[];

  createdBy: Account;

  isSubmission: boolean;
}
