# Pagination Module Documentation

## Overview

This documentation provides an overview of the pagination system implemented in the `algowars` backend. It covers the files responsible for pagination logic, including schemas, repositories, DTOs, and labels.

## Directory Structure

```text
- src/
  - common/
    - pagination/
      - db/
        - pageable-entity.schema.ts
        - pageable.repository.spec.ts
        - pageable.repository.ts
        - pagination-entity.repository.ts
      - dto/
        - request/
          - pagination-request.dto.ts
        - response/
          - pagination-response.dto.ts
        - pageable.ts
      - label/
        - pagination.label.ts
      - pagination.module.ts
    - common.module.ts
```

## Detailed File Descriptions

### Database Files

- `db/pageable-entity.schema.ts`
  - **Description**: Defines the schema for entities that support pagination. It outlines the structure and types of the pageable entities.
  - **Usage**: Used by Mongoose or TypeORM to enforce schema definitions on pageable data models.

- `db/pageable.repository.spec.ts`
  - **Description**: Contains unit tests for `pageable.repository.ts`. It ensures that the pagination repository functions correctly.
  - **Tests**: Covers CRUD operations and pagination logic.

- `db/pageable.repository.ts`
  - **Description**: Implements the repository pattern for pageable entities, providing methods to query paginated data.
  - **Methods**:
    - `findPaginated()`: Retrieves paginated data based on provided criteria.

- `db/pagination-entity.repository.ts`
  - **Description**: Manages pagination for entities, offering methods to handle pagination queries and results.
  - **Methods**:
    - `paginate()`: Executes the pagination logic on a given query.

### DTO Files

- `dto/request/pagination-request.dto.ts`
  - **Description**: Defines the data transfer object for pagination requests. Includes parameters like page number, page size, and sorting options.
  - **Fields**:
    - `page`: The current page number.
    - `size`: The number of items per page.
    - `sort`: Sorting criteria.

- `dto/response/pagination-response.dto.ts`
  - **Description**: Defines the data transfer object for pagination responses. Contains metadata about the pagination and the actual paginated data.
  - **Fields**:
    - `items`: The array of paginated items.
    - `totalItems`: The total number of items.
    - `totalPages`: The total number of pages.
    - `currentPage`: The current page number.

- `dto/pageable.ts`
  - **Description**: Contains helper functions and classes to support pageable DTOs.
  - **Usage**: Utilized within the DTOs to maintain consistent pagination logic and structure.

### Label Files

- `label/pagination.label.ts`
  - **Description**: Contains labels and constants used in the pagination module.
  - **Usage**: Provides standardized labels for pagination responses and errors.

### Module File

- `pagination.module.ts`
  - **Description**: Configures the pagination module, importing necessary dependencies and exporting the pagination services.
  - **Configuration**:
    - Imports DTOs, repositories, and other modules required for pagination functionality.
    - Exports the pagination services for use in other parts of the application.

### Common Module

- `common.module.ts`
  - **Description**: Centralizes common functionality used across different modules, including the pagination module.
  - **Usage**: Ensures shared services and modules are available throughout the application.

## Integration and Usage Example

To use the pagination module in your service, inject the necessary repository and DTOs:

```typescript
import { PaginationRequestDto, PaginationResponseDto } from './pagination/dto';
import { PageableRepository } from './pagination/db/pageable.repository';

@Injectable()
export class SomeService {
  constructor(private readonly pageableRepository: PageableRepository) {}

  async getPaginatedData(paginationRequest: PaginationRequestDto): Promise<PaginationResponseDto> {
    return this.pageableRepository.findPaginated(paginationRequest);
  }
}


