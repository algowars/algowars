import { BaseEntity } from 'src/common/entities/base-entity';

export interface TagEntity extends BaseEntity {
  id: number;
  name: string;
}
