import { Id } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';

export interface SubmissionQuery {
  findSolutions(problemId: Id): Promise<Submission[]>;
}
