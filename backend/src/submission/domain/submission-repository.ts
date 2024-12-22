import { Id } from 'src/common/domain/id';

export interface SubmissionRepository {
  newId(): Promise<Id>;
}
