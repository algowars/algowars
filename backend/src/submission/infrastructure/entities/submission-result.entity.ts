import { BaseEntity } from 'src/common/entities/base-entity';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export interface SubmissionResultEntity extends BaseEntity {
  token: string;
  source_code?: string;
  language_id?: number;
  stdin?: string;
  stdout?: string;
  time?: string;
  memory?: number;
  stderr?: string;
  expected_output?: string;
  message?: string;
  submission_id: string;
  status: SubmissionStatus;
}
