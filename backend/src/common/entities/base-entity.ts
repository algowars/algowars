export interface BaseEntity {
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  version: number;
}
