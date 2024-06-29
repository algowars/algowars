import { UpdateSubmissionResultTestcase } from 'src/submission-result/dto/update-submission-result-testcase.dto';

export class UpdateSubmissionResultTestcasesCommand {
  constructor(
    public readonly updateSubmissionResultTestcases: UpdateSubmissionResultTestcase[],
  ) {}
}
