import { PaginationConfig } from './pagination-config';

import { PageResultImplementation } from './page-result';
import { Knex } from 'knex';

export class Pagination {
  public static async paginate<T>(
    knex: Knex,
    tableName: string,
    { page, size, timestamp, filters, resultsTransformer }: PaginationConfig<T>,
  ) {
    if (page < 1 || size < 1) {
      throw new Error('Page and size must be greater than 0');
    }

    let query = knex(tableName).select('*');

    if (filters) {
      query = query.where(filters);
    }

    if (timestamp) {
      query = query.where('created_at', '>=', timestamp);
    }

    const offset = (page - 1) * size;

    const [{ count }] = await knex(tableName)
      .count('* as count')
      .where(filters || {});
    const totalItems = Number(count);
    const totalPages = Math.ceil(totalItems / size);

    const results = await query.offset(offset).limit(size);

    return new PageResultImplementation<T>(
      resultsTransformer(results),
      page,
      size,
      totalPages,
    );
  }
}
