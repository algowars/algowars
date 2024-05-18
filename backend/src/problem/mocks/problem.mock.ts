import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { ProblemPaginationDto } from '../dtos/problem-pagination.dto';
import { Player, Problem } from 'src/data-model/entities';
import { CreateProblemDto } from '../dtos/create-problem.dto';

export class ProblemMock {
  static mockProblemService(problems: Problem[], totalPages = 1) {
    return {
      getProblemsPageable: jest.fn(
        (dto: ProblemPaginationDto): Promise<PaginationResponse<Problem>> => {
          const mockProblems: Problem[] = problems;
          return Promise.resolve({
            results: mockProblems,
            page: dto.page,
            size: dto.size,
            totalPages,
          });
        },
      ),
      create: jest.fn(
        (
          { title, question, slug }: CreateProblemDto,
          player: Player,
        ): Promise<Problem> => {
          const problem = new Problem();

          problem.title = title;
          problem.question = question;
          problem.slug = slug;
          problem.createdBy = Promise.resolve(player);

          return Promise.resolve(problem);
        },
      ),
      findOneById: jest.fn((id: number) => {
        return problems.find((p) => p.id === id);
      }),
      findProblemWithTests: jest.fn((id: number) => {
        return problems.find((p) => p.id === id);
      }),
      findOneBySlug: jest.fn((slug: string) => {
        return problems.find((p) => p.slug === slug) ?? null;
      }),
      findRandomProblem: jest.fn(() => {
        return problems[0] ?? null;
      }),
      findProblemsByRating: jest.fn(() => {
        return problems;
      }),
    };
  }
}
