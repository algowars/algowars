import { BaseEntity } from 'src/common/entities/base-entity';

export interface AccountEntity extends BaseEntity {
  id: string;
  sub?: string;
  username: string;
  deleted_at: Date | null;
}
