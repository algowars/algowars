import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSubmissionResultByIdQuery } from './find-submission-result-by-id.query';
import { SubmissionResultDtoRepository } from 'src/submission-result/db/submission-result-dto.repository';
import { SubmissionResultDto } from 'src/submission-result/dto/submission-result.dto';

@QueryHandler(FindSubmissionResultByIdQuery)
export class FindSubmissionResultByIdHandler
  implements IQueryHandler<FindSubmissionResultByIdQuery>
{
  constructor(
    private readonly submissionResultDtoRepository: SubmissionResultDtoRepository,
  ) {}

  async execute({
    id,
  }: FindSubmissionResultByIdQuery): Promise<SubmissionResultDto> {
    return this.submissionResultDtoRepository.findById(id);
  }
}
