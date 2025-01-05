import { Id } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';

export interface SubmissionQuery {
  findById(id: Id): Promise<Submission>;
  findByUserId(userId: Id): Promise<Submission[]>;
}
