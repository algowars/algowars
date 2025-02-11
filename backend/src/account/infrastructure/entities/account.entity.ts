import { BaseEntity } from 'src/common/entities/base-entity';

export interface AccountEntity extends BaseEntity {
  id: string;
  sub?: string;
  username: string;
  picture?: string | null;
  deleted_at: Date | null;
}
