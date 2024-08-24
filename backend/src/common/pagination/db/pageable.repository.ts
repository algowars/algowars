import { Pageable } from '../dto/pageable'; // Import the Pageable interface for pagination parameters
import {
  DataSource, // TypeORM DataSource for database connection
  EntityTarget, // TypeORM type for entity target
  FindManyOptions, // TypeORM options for finding multiple entities
  FindOptionsWhere, // TypeORM options for filtering entities
  LessThanOrEqual, // TypeORM operator for less than or equal comparison
  Repository, // TypeORM base repository class
} from 'typeorm';
import { PaginationResponse } from '../dto/response/pagination-response.dto'; // Import the pagination response DTO

// Define a generic PageableRepository class that extends TypeORM's Repository class
export class PageableRepository<Entity> extends Repository<Entity> {
  // Constructor accepting the entity target and data source
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager()); // Call the parent constructor with the target and a new entity manager
  }

  // Method to find entities with pagination and optional timestamp filter
  async findPageable(
    { page, size, timestamp }: Pageable, // Destructure pageable parameters
    entityFilterQuery: FindManyOptions<Entity> = {}, // Optional filter query for entities
  ): Promise<PaginationResponse<Entity>> { // Return a promise of pagination response
    // If a timestamp is provided, build a filter query based on it
    if (timestamp) {
      entityFilterQuery = this.buildTimestampFilterQuery(
        entityFilterQuery,
        timestamp,
      );
    }

    // Execute the find query with pagination parameters
    const query = await this.find({
      ...entityFilterQuery, // Include any existing filter options
      skip: (page - 1) * size, // Calculate the number of items to skip based on the current page
      take: size, // Limit the results to the specified size
    });

    // Count the total number of entities matching the filter query
    const count = await this.count(entityFilterQuery);

    // Return the paginated response containing results and metadata
    return {
      results: query, // The found entities
      page, // Current page number
      size, // Number of items per page
      totalPages: count, // Total number of entities for pagination
    };
  }

  // Private method to build a timestamp filter query for the entity
  private buildTimestampFilterQuery(
    entityFilterQuery: FindManyOptions<Entity>, // Existing filter query
    timestamp: Date, // The timestamp to filter entities by
  ): FindManyOptions<Entity> { // Return an updated filter query
    const newQuery: FindManyOptions<Entity> = {
      ...entityFilterQuery, // Include existing filter options
      where: {
        ...entityFilterQuery.where, // Preserve existing where conditions
        createdAt: LessThanOrEqual(timestamp), // Add timestamp filter for createdAt field
      } as FindOptionsWhere<Entity>, // Cast to FindOptionsWhere for TypeORM compatibility
    };

    return newQuery; // Return the updated query
  }
}
