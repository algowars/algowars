import { readConnection } from 'lib/database.module';
import { BaseEntity } from '../entities/base-entity';
import { PaginationConfig } from './pagination-config';
import {
  EntityTarget,
  LessThan,
  FindOptionsWhere,
  FindOptionsOrder,
} from 'typeorm';
import { PageResultImplementation } from './page-result';

export class Pagination {
  public static async paginate<T>(
    entity: EntityTarget<BaseEntity & { createdAt: Date }>,
    paginationConfig: PaginationConfig<T>,
  ) {
    const repository = readConnection.getRepository<
      BaseEntity & { createdAt: Date }
    >(entity);

    const { page, size, timestamp, resultsTransformer, relations } =
      paginationConfig;
    const skip = (page - 1) * size;
    const take = size;

    const whereCondition = timestamp
      ? ({ createdAt: LessThan(timestamp) } as FindOptionsWhere<
          BaseEntity & { createdAt: Date }
        >)
      : undefined;

    const orderCondition = { createdAt: 'DESC' } as FindOptionsOrder<
      BaseEntity & { createdAt: Date }
    >;

    const [results, total] = await repository.findAndCount({
      where: whereCondition,
      skip,
      take,
      relations: relations ?? [],
      order: orderCondition,
    });

    const totalPages = Math.ceil(total / size);

    return new PageResultImplementation<T>(
      resultsTransformer(results),
      page,
      size,
      totalPages,
    );
  }
}
