import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem, Submission } from 'src/data-model/entities';
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
    problem: Problem,
  ): Promise<Submission> {
    console.log('CREATE SUBMISSION DTO: ', createSubmissionDto);
    const submission = this.submissionRepository.create({
      ...createSubmissionDto,
      problem,
    });

    return this.submissionRepository.save(submission);
  }

  findById(id: string, relations: string[] = []): Promise<Submission> {
    if (!id) {
      return null;
    }

    return this.submissionRepository.findOne({ where: { id }, relations });
  }
}
