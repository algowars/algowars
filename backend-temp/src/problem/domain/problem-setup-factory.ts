import { IdImplementation } from 'src/common/domain/id';
import { ProblemSetup, ProblemSetupImplementation } from './problem-setup';
import { ProblemSetupEntity } from '../infrastructure/entities/problem-setup.entity';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTestOptions,
  TestFactory,
} from 'src/problem/domain/test-factory';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { LanguageFactory } from './language-factory';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { TestEntity } from '../infrastructure/entities/test.entity';

export type CreateProblemSetupOptions = Readonly<{
  problemId: string;
  languageId: number;
  initialCode: string;
  tests?: CreateTestOptions[];
  solution: Submission;
}>;

@Injectable()
export class ProblemSetupFactory implements EntityDomainFactory<ProblemSetup> {
  @Inject() private readonly testFactory: TestFactory;
  @Inject() private readonly submissionFactory: SubmissionFactory;
  @Inject() private readonly languageFactory: LanguageFactory;

  create(options: CreateProblemSetupOptions): ProblemSetup {
    return new ProblemSetupImplementation({
      ...options,
      problemId: new IdImplementation(options.problemId),
      languageId: new IdImplementation(options.languageId),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      solution: options.solution,
      version: 0,
      tests: Array.isArray(options?.tests)
        ? options.tests.map((test) => this.testFactory.create(test))
        : null,
    });
  }
}
