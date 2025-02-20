import { Id } from 'src/common/domain/id';
import { Submission } from './submission';
import { SubmissionResult } from './submission-result';

export interface SubmissionRepository {
  newId(): Promise<Id>;
  save(data: Submission | Submission[]): Promise<void>;
  findById(id: Id): Promise<Submission | null>;
  updateResult(result: SubmissionResult): Promise<void>;
  updateResults(results: SubmissionResult[]): Promise<void>;
}
