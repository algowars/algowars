import { Id } from 'src/common/domain/id';
import { Submission } from './submission';
import { Problem } from 'src/problem/domain/problem';

export interface SubmissionRepository {
  newId(): Promise<Id>;
  save(submission: Submission | Submission[]): Promise<void>;
  findById(id: Id): Promise<Submission | null>;
  findProblemBySlug(slug: string): Promise<Problem>;
}
