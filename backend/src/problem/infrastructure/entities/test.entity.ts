import { BaseEntity } from 'src/common/entities/base-entity';

export interface TestEntity extends BaseEntity {
  id: string;
  code: string;
  problem_id: string;
  language_id: number;
  additional_test_file_id: string;
}
