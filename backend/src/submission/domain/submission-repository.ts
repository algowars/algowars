import { Id } from 'src/common/domain/id';
import { Submission } from './submission';

export interface SubmissionRepository {
  newId(): Promise<Id>;
  save(data: Submission | Submission[]): Promise<void>;
}
