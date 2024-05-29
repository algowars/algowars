import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { ProblemSchema } from './problem.schema';
import { Problem } from '../entities/problem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemSchemaFactory } from './problem-schema.factory';

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
}
