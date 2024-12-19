import { BaseEntity } from 'src/common/entities/base-entity';
import { ProblemStatus } from 'src/problem/domain/problem-status';

export interface ProblemEntity extends BaseEntity {
  id: string;
  title: string;
  question: string;
  slug: string;
  status: ProblemStatus;
  created_by_id: string;
}
