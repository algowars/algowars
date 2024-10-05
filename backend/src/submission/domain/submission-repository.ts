import { Id } from 'src/common/domain/id';
import { Submission } from './submission';

export interface SubmissionRepository {
  newId: () => Promise<Id>;
  save: (submission: Submission | Submission[]) => Promise<void>;
  findById: (id: Id) => Promise<Submission | null>;
}
