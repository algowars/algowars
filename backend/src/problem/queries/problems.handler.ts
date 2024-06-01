import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProblemsQuery } from './problems.query';
import { ProblemDtoRepository } from '../db/problem-dto.repository';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { ProblemDto } from '../dto/problem.dto';

@QueryHandler(ProblemsQuery)
export class ProblemsHandler implements IQueryHandler<ProblemsQuery> {
  constructor(private readonly problemDtoRepository: ProblemDtoRepository) {}
  async execute({
    problemPagination,
  }: ProblemsQuery): Promise<PaginationResponse<ProblemDto> {
    return this.problemDtoRepository.findAllPageable(problemPagination);
  }
}
