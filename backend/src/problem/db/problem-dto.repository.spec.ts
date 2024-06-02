import { Test, TestingModule } from '@nestjs/testing';
import { ProblemDtoRepository } from './problem-dto.repository';
import { DataSource } from 'typeorm';
import { ProblemSchema } from './problem.schema';
import { Pageable } from 'src/common/pagination/dto/pageable';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { DatabaseMock } from 'src/test-utils/database/database.mock';

describe('ProblemDtoRepository', () => {
  let repository: ProblemDtoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemDtoRepository,
        {
          provide: DataSource,
          useValue: DatabaseMock.mockDataSource(),
        },
      ],
    }).compile();

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

      jest.spyOn(repository, 'find').mockResolvedValue(problemSchemas);

      const result = await repository.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);
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

      jest
        .spyOn(repository, 'findPageable')
        .mockResolvedValue(paginationResponse);

      const result = await repository.findProblemsPageable(problemPageable);

      expect(repository.findPageable).toHaveBeenCalledTimes(1);
      expect(repository.findPageable).toHaveBeenCalledWith(problemPageable);

      expect(result.results).toEqual(
        problemSchemas.map((problem) => repository['toProblemDto'](problem)),
      );
      expect(result.page).toBe(problemPageable.page);
      expect(result.size).toBe(problemPageable.size);
      expect(result.totalPages).toBe(1);
    });
  });
});
