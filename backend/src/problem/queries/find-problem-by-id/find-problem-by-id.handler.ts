import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemByIdQuery } from './find-problem-by-id.query';
import { ProblemDtoRepository } from 'src/problem/db/problem-dto.repository';
import { ProblemDto } from 'src/problem/dto/problem.dto';

@QueryHandler(FindProblemByIdQuery)
export class FindProblemByIdHandler
  implements IQueryHandler<FindProblemByIdQuery>
{
  constructor(private readonly problemDtoRepository: ProblemDtoRepository) {}

  async execute({ id }: FindProblemByIdQuery): Promise<ProblemDto> {
    return this.problemDtoRepository.findById(id);
  }
}
