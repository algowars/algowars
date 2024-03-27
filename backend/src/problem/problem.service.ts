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

  findOneById(id: number, relations: string[] = []) {
    if (!id) {
      return null;
    }

    return this.problemRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  findOneBySlug(slug: string, relations: string[] = []) {
    if (!slug) {
      return null;
    }

    return this.problemRepository.findOne({
      where: {
        slug,
      },
      relations,
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
}
