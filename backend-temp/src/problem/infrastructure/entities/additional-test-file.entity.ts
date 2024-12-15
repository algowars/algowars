import { BaseEntity } from 'src/common/entities/base-entity';

export interface AdditionalTestFileEntity extends BaseEntity {
  id: string;
  file_name: string;
  name: string;
  language_id: number;
  initial_test_file: string;
}
