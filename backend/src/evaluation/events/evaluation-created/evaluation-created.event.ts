import { SubmissionResult } from 'src/submission-result/entities/submission-result.entity';

export class EvaluationCreatedEvent {
  constructor(public readonly submissionResult: SubmissionResult) {}
}
