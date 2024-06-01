import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dto/pagination-response.dto';

export class Pagination {
  public static async paginate<T>(
    repository: Repository<T>,
    { page, size }: PaginationDto,
    findOptions: FindOneOptions<T>,
  ): Promise<PaginationResponse<T>> {
    const query = await repository.find({
      ...findOptions,
      skip: (page - 1) * size,
      take: size,
    });

    const count = await repository.count(findOptions);

    return {
      results: query,
      page,
      size,
      totalPages: Pagination.calculatePageTotal(size, count),
    };
  }

  public static async paginateWithQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T>,
    { page, size, timestamp }: PaginationDto,
    entityName?: string,
  ): Promise<PaginationResponse<T>> {
    if (timestamp) {
      if (!entityName) {
        throw new Error(
          'Entity Name is required to paginate the query with a timestamp',
        );
      }

      queryBuilder.andWhere(`${entityName}.createdAt < :timestamp`, {
        timestamp,
      });
    }

    queryBuilder.take(size).skip((page - 1) * size);

    const [results, count] = await queryBuilder.getManyAndCount();

    return {
      results,
      page: +page,
      size,
      totalPages: this.calculatePageTotal(size, count),
    };
  }

  public static calculatePageTotal(size: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return Math.ceil(total / size);
  }
}
