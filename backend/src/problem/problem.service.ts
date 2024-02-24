import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  findOneById(id: number) {
    if (!id) {
      return null;
    }

    return this.problemRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneBySlug(titleSlug: string) {
    if (!titleSlug) {
      return null;
    }

    return this.problemRepository.findOneBy({
      titleSlug,
    });
  }

  findRandomProblem(disallowedIds: number[] = []): Promise<Problem> {
    const entityName = 'problem';
    const queryBuilder = this.problemRepository.createQueryBuilder(entityName);

    if (disallowedIds.length) {
      queryBuilder.where(`${entityName}.id NOT IN (:...ids)`, {
        ids: disallowedIds,
      });
    }

    return queryBuilder.orderBy('RANDOM()').getOne();
  }

  findProblemSetup(problemId: number, languageId: number) {
    console.log(problemId, languageId);
  }
}
