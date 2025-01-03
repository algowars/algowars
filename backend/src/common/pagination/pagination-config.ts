import { BaseEntity } from '../entities/base-entity';

export interface PaginationConfig<T> {
  page: number;
  size: number;
  timestamp: Date;
  resultsTransformer(result: BaseEntity[]): T[];
  relations?: string[];
  filters?: Partial<Record<keyof T, any>>;
}
