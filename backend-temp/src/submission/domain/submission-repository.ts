import { Id } from 'src/common/domain/id';
import { Submission } from './submission';
import { SubmissionResult } from './submission-result';

export interface SubmissionRepository {
  newId(): Promise<Id>;
  save(submission: Submission | Submission[]): Promise<void>;
  findById(id: Id): Promise<Submission | null>;
  updateSubmissionResult(submissionResult: SubmissionResult): Promise<void>;
}
