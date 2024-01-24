import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';

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
    entity: string,
  ): Promise<PaginationResponse<T>> {
    queryBuilder
      .andWhere(`${entity}.createdAt < :timestamp`, {
        timestamp,
      })
      .take(size)
      .skip((page - 1) * size);

    const [results, count] = await queryBuilder.getManyAndCount();

    return {
      results,
      page,
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
