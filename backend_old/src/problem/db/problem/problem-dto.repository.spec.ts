import { Test, TestingModule } from '@nestjs/testing';
import { ProblemDtoRepository } from './problem-dto.repository';
import { DataSource } from 'typeorm';
import { ProblemSchema } from './problem.schema';
import { Pageable } from 'src/common/pagination/dto/pageable';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { DatabaseMock } from 'src/test-utils/database/database.mock';

describe('ProblemDtoRepository', () => {
  let repository: ProblemDtoRepository;

  // Setup before each test case
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemDtoRepository,
        {
          provide: DataSource,
          useValue: DatabaseMock.mockDataSource(), // Mocked DataSource to avoid actual database interactions
        },
      ],
    }).compile();

    // Get an instance of the repository from the testing module
    repository = module.get<ProblemDtoRepository>(ProblemDtoRepository);
  });

  describe('findAll', () => {
    it('should return all problems as ProblemDto array', async () => {
      const problemSchemas: ProblemSchema[] = [
        {
          id: '1',
          title: 'Problem 1',
          question: 'Question 1',
          slug: 'problem-1',
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Problem 2',
          question: 'Question 2',
          slug: 'problem-2',
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mock the repository's find method to return the problemSchemas array
      jest.spyOn(repository, 'find').mockResolvedValue(problemSchemas);

      const result = await repository.findAll();

      // Verify that the find method was called exactly once
      expect(repository.find).toHaveBeenCalledTimes(1);

      // Verify that the result is correctly mapped to ProblemDto array
      expect(result).toEqual(
        problemSchemas.map((problem) => repository['toProblemDto'](problem)),
      );
    });
  });

  describe('findProblemsPageable', () => {
    it('should return pageable problems as PaginationResponse<ProblemDto>', async () => {
      const problemPageable: Pageable = { page: 1, size: 10, timestamp: null };
      const problemSchemas: ProblemSchema[] = [
        {
          id: '1',
          title: 'Problem 1',
          question: 'Question 1',
          slug: 'problem-1',
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Problem 2',
          question: 'Question 2',
          slug: 'problem-2',
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const paginationResponse: PaginationResponse<ProblemSchema> = {
        results: problemSchemas,
        page: 1,
        size: 10,
        totalPages: 1,
      };

      // Mock the repository's findPageable method to return the paginationResponse
      jest
        .spyOn(repository, 'findPageable')
        .mockResolvedValue(paginationResponse);

      const result = await repository.findProblemsPageable(problemPageable);

      // Verify that the findPageable method was called exactly once with the correct pageable parameter
      expect(repository.findPageable).toHaveBeenCalledTimes(1);
      expect(repository.findPageable).toHaveBeenCalledWith(problemPageable);

      // Verify that the result is correctly mapped to PaginationResponse<ProblemDto>
      expect(result.results).toEqual(
        problemSchemas.map((problem) => repository['toProblemDto'](problem)),
      );
      expect(result.page).toBe(problemPageable.page);
      expect(result.size).toBe(problemPageable.size);
      expect(result.totalPages).toBe(1);
    });
  });
});
