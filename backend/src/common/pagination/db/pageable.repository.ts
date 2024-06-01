import { Pageable } from '../dto/pageable';
import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  LessThanOrEqual,
  Repository,
} from 'typeorm';
import { PaginationResponse } from '../dto/response/pagination-response.dto';

export class PageableRepository<Entity> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async findPageable(
    { page, size, timestamp }: Pageable,
    entityFilterQuery: FindManyOptions<Entity> = {},
  ): Promise<PaginationResponse<Entity>> {
    if (timestamp) {
      entityFilterQuery = this.buildTimestampFilterQuery(
        entityFilterQuery,
        timestamp,
      );
    }

    const query = await this.find({
      ...entityFilterQuery,
      skip: (page - 1) * size,
      take: size,
    });

    const count = await this.count(entityFilterQuery);

    return {
      results: query,
      page,
      size,
      totalPages: count,
    };
  }

  private buildTimestampFilterQuery(
    entityFilterQuery: FindManyOptions<Entity>,
    timestamp: Date,
  ): FindManyOptions<Entity> {
    const newQuery: FindManyOptions<Entity> = {
      ...entityFilterQuery,
      where: {
        ...entityFilterQuery.where,
        createdAt: LessThanOrEqual(timestamp),
      } as FindOptionsWhere<Entity>,
    };

    return newQuery;
  }
}
