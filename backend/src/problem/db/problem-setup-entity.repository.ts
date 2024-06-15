import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemSetupSchema } from './problem-setup.schema';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemSetupEntityRepository {
  constructor(
    @InjectRepository(ProblemSetupSchema)
    problemSetupRepository: Repository<ProblemSetupSchema>,
    problemSetupSchmaFactory: ProblemSetupSchemaFactory,
  ) {}
}
