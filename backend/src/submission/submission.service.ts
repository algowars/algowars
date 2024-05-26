import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player, Problem, Submission } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { JudgeSubmissionResponse } from 'src/data-model/models/judge-submission-response';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  createSubmission(
    code: string,
    judgeSubmissions: JudgeSubmissionResponse[],
    problem: Problem,
    languageId: number,
    player: Player,
  ): Promise<Submission> {
    return this.submissionRepository.save({
      code,
      tokens: judgeSubmissions,
      problem,
      languageId,
      createdBy: player,
    });
  }

  findById(id: string, relations: string[] = []): Promise<Submission> {
    if (!id) {
      return null;
    }

    return this.submissionRepository.findOne({ where: { id }, relations });
  }
}
