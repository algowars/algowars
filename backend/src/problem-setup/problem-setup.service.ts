import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemSetup } from 'src/data-model/entities/problem-setup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemSetupService {
  constructor(
    @InjectRepository(ProblemSetup)
    private readonly problemSetupRepository: Repository<ProblemSetup>,
  ) {}

  findProblemSetupByIds(problemId: number, languageId: number) {
    return this.problemSetupRepository.findOne({
      where: {
        problem: {
          id: problemId,
        },
        languageId,
      },
    });
  }
}
