import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemAggregateBySlugQuery } from './find-problem-aggregate-by-slug.query';
import { ProblemAggregateDto } from 'src/problem/dto/problem-aggregate.dto';
import { ProblemDtoRepository } from 'src/problem/db/problem/problem-dto.repository';

@QueryHandler(FindProblemAggregateBySlugQuery)
export class FindProblemAggregateBySlugHandler
  implements IQueryHandler<FindProblemAggregateBySlugQuery>
{
  constructor(private readonly problemDtoRepository: ProblemDtoRepository) {}

  async execute({
    findProblemSlugDto,
  }: FindProblemAggregateBySlugQuery): Promise<ProblemAggregateDto> {
    const problemAggregate =
      await this.problemDtoRepository.findAggregateBySlug(
        findProblemSlugDto.slug,
        findProblemSlugDto.languageId,
      );

    return this.mapPublicTestCases(problemAggregate);
  }

  private mapPublicTestCases(
    problemAggregate: ProblemAggregateDto,
  ): ProblemAggregateDto {
    problemAggregate.testCases = problemAggregate.testCases.slice(0, 3);

    return problemAggregate;
  }
}
