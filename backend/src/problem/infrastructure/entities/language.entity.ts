import { BaseEntity } from 'src/common/entities/base-entity';

export interface LanguageEntity extends BaseEntity {
  id: number;
  name: string;
  is_archived: boolean;
  is_available: boolean;
  initial_code: string;
  initial_solution: string;
}
