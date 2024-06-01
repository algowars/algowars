import { AggregateRoot } from '@nestjs/cqrs';
import { EntityRepository } from 'src/db/entity.repository';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { FindManyOptions, FindOptionsWhere, LessThanOrEqual } from 'typeorm';
import { PaginationResponse } from '../dto/response/pagination-response.dto';
import { Pageable } from '../dto/pageable';
import { PageableEntitySchema } from './pageable-entity.schema';

export abstract class PaginationEntityRepository<
  Schema extends IdentifiableEntitySchema & PageableEntitySchema,
  Entity extends AggregateRoot,
> extends EntityRepository<Schema, Entity> {
  async findPageable(
    { page, size, timestamp }: Pageable,
    entityFilterQuery: FindManyOptions<Schema>,
  ): Promise<PaginationResponse<Entity>> {
    if (timestamp) {
      entityFilterQuery = this.buildTimestampFilterQuery(
        entityFilterQuery,
        timestamp,
      );
    }

    const query = await this.entityRepository.find({
      ...entityFilterQuery,
      skip: (page - 1) * size,
      take: size,
    });

    const count = await this.entityRepository.count(entityFilterQuery);

    return {
      results: query.map((entityDocument) =>
        this.entitySchemaFactory.createFromSchema(entityDocument),
      ),
      page,
      size,
      totalPages: count,
    };
  }

  private buildTimestampFilterQuery(
    entityFilterQuery: FindManyOptions<Schema>,
    timestamp: Date,
  ): FindManyOptions<Schema> {
    const newQuery: FindManyOptions<Schema> = {
      ...entityFilterQuery,
      where: {
        ...entityFilterQuery.where,
        createdAt: LessThanOrEqual(timestamp),
      } as FindOptionsWhere<Schema>,
    };

    return newQuery;
  }
}
