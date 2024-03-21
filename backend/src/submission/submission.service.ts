import { Injectable } from '@nestjs/common';
import { Submission } from 'src/data-model/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dtos/create-submission.dto';

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
}
