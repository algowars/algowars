import { BaseEntity } from 'src/common/entities/base-entity';

export interface ProblemSetupEntity extends BaseEntity {
  problem_id: string;
  language_id: number;
  solution_id: string;
  initial_code: string;
}