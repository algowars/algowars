import { Injectable } from '@nestjs/common';
import { Submission } from 'src/data-model/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dtos/create-submission.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { SubmissionPaginationDto } from './dtos/submission-pagination.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  createSubmission(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<Submission> {
    const submission = this.submissionRepository.create(createSubmissionDto);

    return this.submissionRepository.save(submission);
  }

  findAccountSubmissionsPageable(
    submissionPaginationDto: SubmissionPaginationDto,
  ): Promise<PaginationResponse<Submission>> {
    const entityName = 'submission';
    const accountName = 'account';
    const queryBuilder =
      this.submissionRepository.createQueryBuilder(entityName);

    queryBuilder.leftJoinAndSelect(`${entityName}.createdBy`, accountName);

    queryBuilder.where(`${accountName}.username = :username`, {
      username: submissionPaginationDto.username,
    });

    return Pagination.paginateWithQueryBuilder(
      queryBuilder,
      submissionPaginationDto,
    );
  }
}
