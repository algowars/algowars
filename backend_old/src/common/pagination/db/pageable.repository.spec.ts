import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, LessThanOrEqual, EntityManager } from 'typeorm';
import { PageableRepository } from './pageable.repository';
import { Pageable } from '../dto/pageable';
import { PaginationResponse } from '../dto/response/pagination-response.dto';
import { DatabaseMock } from 'src/test-utils/database/database.mock';

// Define a test entity interface for testing purposes
interface TestEntity {
  id: string; // Unique identifier for the entity
  createdAt: Date; // Timestamp of when the entity was created
}

describe('PageableRepository', () => {
  let repository: PageableRepository<TestEntity>; // Instance of the repository to be tested
  let entityManager: EntityManager; // Mock EntityManager for testing

  // Mock the database data source
  const mockDataSource = DatabaseMock.mockDataSource();

  // Mock functions for find and count methods
  const mockFind = jest.fn();
  const mockCount = jest.fn();

  beforeEach(async () => {
    // Create a new EntityManager for each test
    entityManager = {} as EntityManager;
    mockDataSource.createEntityManager.mockReturnValue(entityManager);

    // Create a testing module with the necessary providers
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataSource, useValue: mockDataSource }, // Provide the mocked data source
        {
          provide: PageableRepository,
          useFactory: (dataSource: DataSource) =>
            new PageableRepository<TestEntity>({} as any, dataSource), // Create a new instance of PageableRepository
          inject: [DataSource],
        },
      ],
    }).compile();

    // Get the repository instance from the testing module
    repository = module.get<PageableRepository<TestEntity>>(PageableRepository);

    // Assign mocked functions to the repository
    repository.find = mockFind;
    repository.count = mockCount;
  });

  afterEach(() => {
    // Clear all mock calls after each test
    jest.clearAllMocks();
  });

  it('should return paginated results without timestamp filter', async () => {
    // Define a pageable object with no timestamp filter
    const pageable: Pageable = { page: 1, size: 10, timestamp: null };
    const entities: TestEntity[] = [
      { id: '1', createdAt: new Date() },
      { id: '2', createdAt: new Date() },
    ];

    // Mock the resolved values for find and count
    mockFind.mockResolvedValue(entities);
    mockCount.mockResolvedValue(2);

    // Call the method under test
    const result: PaginationResponse<TestEntity> =
      await repository.findPageable(pageable);

    // Verify that find and count were called with the expected parameters
    expect(mockFind).toHaveBeenCalledWith({
      skip: 0, // No items skipped for the first page
      take: 10, // Limit to 10 items per page
    });
    expect(mockCount).toHaveBeenCalledWith({}); // Count all entities
    expect(result).toEqual({
      results: entities, // Expected results
      page: 1, // Current page
      size: 10, // Number of items per page
      totalPages: 2, // Total number of pages based on the count
    });
  });

  it('should return paginated results with timestamp filter', async () => {
    // Define a pageable object with a timestamp filter
    const pageable: Pageable = {
      page: 1,
      size: 10,
      timestamp: new Date('2023-01-01'), // Filter entities created on or before this date
    };
    const entities: TestEntity[] = [
      { id: '1', createdAt: new Date('2023-01-01') },
      { id: '2', createdAt: new Date('2023-01-01') },
    ];

    // Mock the resolved values for find and count
    mockFind.mockResolvedValue(entities);
    mockCount.mockResolvedValue(2);

    // Call the method under test
    const result: PaginationResponse<TestEntity> =
      await repository.findPageable(pageable);

    // Verify that find and count were called with the expected parameters including the timestamp filter
    expect(mockFind).toHaveBeenCalledWith({
      where: { createdAt: LessThanOrEqual(pageable.timestamp) }, // Filter by createdAt date
      skip: 0, // No items skipped for the first page
      take: 10, // Limit to 10 items per page
    });
    expect(mockCount).toHaveBeenCalledWith({
      where: { createdAt: LessThanOrEqual(pageable.timestamp) }, // Count entities with the same filter
    });
    expect(result).toEqual({
      results: entities, // Expected results
      page: 1, // Current page
      size: 10, // Number of items per page
      totalPages: 2, // Total number of pages based on the count
    });
  });
});
