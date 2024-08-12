import { AggregateRoot } from '@nestjs/cqrs'; // Import AggregateRoot for CQRS pattern support
import { EntityRepository } from 'src/db/entity.repository'; // Import the base entity repository
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema'; // Import the schema for identifiable entities
import { FindManyOptions, FindOptionsWhere, LessThanOrEqual } from 'typeorm'; // Import TypeORM types and operators
import { PaginationResponse } from '../dto/response/pagination-response.dto'; // Import the pagination response DTO
import { Pageable } from '../dto/pageable'; // Import the Pageable interface for pagination parameters
import { PageableEntitySchema } from './pageable-entity.schema'; // Import the schema for pageable entities

// Define an abstract class for pagination entity repositories
export abstract class PaginationEntityRepository<
  Schema extends IdentifiableEntitySchema & PageableEntitySchema, // Schema type extending identifiable and pageable entity schemas
  Entity extends AggregateRoot, // Entity type extending AggregateRoot
> extends EntityRepository<Schema, Entity> { // Extend the base entity repository with the generic types
  // Method to find entities with pagination and optional timestamp filter
  async findPageable(
    { page, size, timestamp }: Pageable, // Destructure pageable parameters
    entityFilterQuery: FindManyOptions<Schema>, // Filter query for entities
  ): Promise<PaginationResponse<Entity>> { // Return a promise of pagination response
    // If a timestamp is provided, build a filter query based on it
    if (timestamp) {
      entityFilterQuery = this.buildTimestampFilterQuery(
        entityFilterQuery,
        timestamp,
      );
    }

    // Execute the find query with pagination parameters
    const query = await this.entityRepository.find({
      ...entityFilterQuery, // Include existing filter options
      skip: (page - 1) * size, // Calculate the number of items to skip based on the current page
      take: size, // Limit the results to the specified size
    });

    // Count the total number of entities matching the filter query
    const count = await this.entityRepository.count(entityFilterQuery);

    // Return the paginated response containing results and metadata
    return {
      results: query.map((entityDocument) =>
        this.entitySchemaFactory.createFromSchema(entityDocument), // Map the results to the desired schema
      ),
      page, // Current page number
      size, // Number of items per page
      totalPages: count, // Total number of entities for pagination
    };
  }

  // Private method to build a timestamp filter query for the entity
  private buildTimestampFilterQuery(
    entityFilterQuery: FindManyOptions<Schema>, // Existing filter query
    timestamp: Date, // The timestamp to filter entities by
  ): FindManyOptions<Schema> { // Return an updated filter query
    const newQuery: FindManyOptions<Schema> = {
      ...entityFilterQuery, // Include existing filter options
      where: {
        ...entityFilterQuery.where, // Preserve existing where conditions
        createdAt: LessThanOrEqual(timestamp), // Add timestamp filter for createdAt field
      } as FindOptionsWhere<Schema>, // Cast to FindOptionsWhere for TypeORM compatibility
    };

    return newQuery; // Return the updated query
  }
}
