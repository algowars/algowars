import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemByIdQuery } from './find-problem-by-id.query';
import { ProblemDto } from 'src/problem/dto/problem.dto';
import { ProblemDtoRepository } from 'src/problem/db/problem/problem-dto.repository';

@QueryHandler(FindProblemByIdQuery)
export class FindProblemByIdHandler
  implements IQueryHandler<FindProblemByIdQuery>
{
  constructor(private readonly problemDtoRepository: ProblemDtoRepository) {}

  async execute({ id }: FindProblemByIdQuery): Promise<ProblemDto> {
    return this.problemDtoRepository.findById(id);
  }
}
