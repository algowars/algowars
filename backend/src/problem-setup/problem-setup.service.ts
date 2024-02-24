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

  findOne(problemId: number, languageId: number, relations: string[] = []) {
    const query =
      this.problemSetupRepository.createQueryBuilder('problemSetup');

    relations.forEach((relation) => {
      query.leftJoinAndSelect(`problemSetup.${relation}`, relation);
    });

    return query
      .where('problemSetup.problemId = :problemId', { problemId })
      .andWhere('problemSetup.languageId = :languageId', { languageId })
      .getOne();
  }
}
