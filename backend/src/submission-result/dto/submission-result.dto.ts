import { AccountDto } from 'src/account/dto/account.dto';
import { SubmissionResultTestcaseDto } from './submission-result-testcase.dto';

export class SubmissionResultDto {
  readonly id: string;
  readonly createdBy: AccountDto;
  readonly isSubmission?: boolean;
  readonly testcases: SubmissionResultTestcaseDto[];
}
