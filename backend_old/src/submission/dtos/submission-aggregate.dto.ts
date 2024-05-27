import { Submission } from 'src/data-model/entities';
import { JudgeSubmission } from 'src/data-model/models/judge-submission';

export class SubmissionAggregateDto {
  submission: Submission;
  judgeSubmissions: JudgeSubmission[];
}
