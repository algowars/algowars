import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, LessThanOrEqual, EntityManager } from 'typeorm';
import { PageableRepository } from './pageable.repository';
import { Pageable } from '../dto/pageable';
import { PaginationResponse } from '../dto/response/pagination-response.dto';
import { DatabaseMock } from 'src/test-utils/database/database.mock';

interface TestEntity {
  id: string;
  createdAt: Date;
}

describe('PageableRepository', () => {
  let repository: PageableRepository<TestEntity>;
  let entityManager: EntityManager;

  const mockDataSource = DatabaseMock.mockDataSource();

  const mockFind = jest.fn();
  const mockCount = jest.fn();

  beforeEach(async () => {
    entityManager = {} as EntityManager;
    mockDataSource.createEntityManager.mockReturnValue(entityManager);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataSource, useValue: mockDataSource },
        {
          provide: PageableRepository,
          useFactory: (dataSource: DataSource) =>
            new PageableRepository<TestEntity>({} as any, dataSource),
          inject: [DataSource],
        },
      ],
    }).compile();

    repository = module.get<PageableRepository<TestEntity>>(PageableRepository);

    repository.find = mockFind;
    repository.count = mockCount;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated results without timestamp filter', async () => {
    const pageable: Pageable = { page: 1, size: 10, timestamp: null };
    const entities: TestEntity[] = [
      { id: '1', createdAt: new Date() },
      { id: '2', createdAt: new Date() },
    ];

    mockFind.mockResolvedValue(entities);
    mockCount.mockResolvedValue(2);

    const result: PaginationResponse<TestEntity> =
      await repository.findPageable(pageable);

    expect(mockFind).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
    expect(mockCount).toHaveBeenCalledWith({});
    expect(result).toEqual({
      results: entities,
      page: 1,
      size: 10,
      totalPages: 2,
    });
  });

  it('should return paginated results with timestamp filter', async () => {
    const pageable: Pageable = {
      page: 1,
      size: 10,
      timestamp: new Date('2023-01-01'),
    };
    const entities: TestEntity[] = [
      { id: '1', createdAt: new Date('2023-01-01') },
      { id: '2', createdAt: new Date('2023-01-01') },
    ];

    mockFind.mockResolvedValue(entities);
    mockCount.mockResolvedValue(2);

    const result: PaginationResponse<TestEntity> =
      await repository.findPageable(pageable);

    expect(mockFind).toHaveBeenCalledWith({
      where: { createdAt: LessThanOrEqual(pageable.timestamp) },
      skip: 0,
      take: 10,
    });
    expect(mockCount).toHaveBeenCalledWith({
      where: { createdAt: LessThanOrEqual(pageable.timestamp) },
    });
    expect(result).toEqual({
      results: entities,
      page: 1,
      size: 10,
      totalPages: 2,
    });
  });
});
