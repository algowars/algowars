import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProblemsPaginationQuery } from './problems-pagination.query';
import { ProblemDtoRepository } from 'src/problem/db/problem-dto.repository';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { ProblemDto } from 'src/problem/dto/problem.dto';

@QueryHandler(ProblemsPaginationQuery)
export class ProblemsPaginationHandler
  implements IQueryHandler<ProblemsPaginationQuery>
{
  constructor(private readonly problemDtoRepository: ProblemDtoRepository) {}

  async execute({
    problemPagination,
  }: ProblemsPaginationQuery): Promise<PaginationResponse<ProblemDto>> {
    return this.problemDtoRepository.findProblemsPageable(problemPagination);
  }
}
