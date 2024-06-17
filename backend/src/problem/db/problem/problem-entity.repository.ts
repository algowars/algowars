import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { Problem } from '../../entities/problem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemSchemaFactory } from './problem-schema.factory';
import { ProblemSchema } from './problem.schema';

@Injectable()
export class ProblemEntityRepository extends BaseEntityRepository<
  ProblemSchema,
  Problem
> {
  constructor(
    @InjectRepository(ProblemSchema)
    problemRepository: Repository<ProblemSchema>,
    problemSchemaFactory: ProblemSchemaFactory,
  ) {
    super(problemRepository, problemSchemaFactory);
  }

  async findBySlug(slug: string): Promise<Problem> {
    const foundProblem = await this.entityRepository.findOne({
      where: {
        slug,
      },
    });

    return this.entitySchemaFactory.createFromSchema(foundProblem);
  }

  async findBySlugWithRelations(slug: string): Promise<Problem> {
    const foundProblem = await this.entityRepository.findOne({
      where: {
        slug,
      },
      relations: ['setups', 'tests', 'tests.inputs'],
    });

    return this.entitySchemaFactory.createFromSchema(foundProblem);
  }
}
