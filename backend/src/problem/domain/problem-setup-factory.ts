import { IdImplementation } from 'src/common/domain/id';
import { Problem } from './problem';
import { Language } from './language';
import { ProblemSetup, ProblemSetupImplementation } from './problem-setup';
import { ProblemSetupEntity } from '../infrastructure/entities/problem-setup.entity';
import { Inject } from '@nestjs/common';
import { ProblemFactory } from './problem-factory';
import { LanguageFactory } from './language-factory';
import {
  CreateTestOptions,
  TestFactory,
} from 'src/problem/domain/test-factory';
import { Test } from 'src/problem/domain/test';

export type CreateProblemSetupOptions = Readonly<{
  problemId: string;
  problem?: Problem;
  languageId: number;
  language?: Language;
  initialCode: string;
  tests?: CreateTestOptions[];
}>;

export class ProblemSetupFactory {
  @Inject() private readonly problemFactory: ProblemFactory;
  @Inject() private readonly languageFactory: LanguageFactory;
  @Inject() private readonly testFactory: TestFactory;

  create(options: CreateProblemSetupOptions): ProblemSetup {
    return new ProblemSetupImplementation({
      ...options,
      problemId: new IdImplementation(options.problemId),
      languageId: new IdImplementation(options.languageId),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
      tests: options.tests?.map((test) => this.testFactory.create(test)),
    });
  }

  async createFromEntity(
    problemSetupEntity: ProblemSetupEntity,
  ): Promise<ProblemSetup> {
    return this.create({
      ...problemSetupEntity,
      problem: await this.problemFactory.createFromEntity(
        problemSetupEntity.problem,
      ),
      language: this.languageFactory.createFromEntity(
        problemSetupEntity.language,
      ),
      tests: problemSetupEntity.tests.map((test) =>
        this.testFactory.createFromEntity(test),
      ),
    });
  }
}
