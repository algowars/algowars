import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemSetup } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemSetupService {
  constructor(
    @InjectRepository(ProblemSetup)
    private readonly problemSetupRepository: Repository<ProblemSetup>,
  ) {}

  findOne(problemId: number, languageId: number) {
    return this.problemSetupRepository.findOneBy({
      problemId,
      languageId,
    });
  }
}
