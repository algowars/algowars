import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { ProblemSetup } from '../entities/problem-setup.entity';

@Injectable()
export class ProblemSetupFactory implements EntityFactory<ProblemSetup> {
  async create(
    problemId: string,
    languageId: number,
    initialCode: string,
    testSetup: string,
  ): Promise<ProblemSetup> {
    const problemSetup = new ProblemSetup(
      problemId,
      languageId,
      initialCode,
      testSetup,
    );

    return problemSetup;
  }
}
