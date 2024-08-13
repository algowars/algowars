import { SubmissionResult } from 'src/submission-result/entities/submission-result.entity';

export class EvaluationCreatedEvent {
  // The event is triggered with a SubmissionResult object when an evaluation is created
  constructor(public readonly submissionResult: SubmissionResult) { }
}
