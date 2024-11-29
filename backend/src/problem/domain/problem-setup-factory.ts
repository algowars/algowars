import { IdImplementation } from 'src/common/domain/id';
import { ProblemSetup, ProblemSetupImplementation } from './problem-setup';
import { ProblemSetupEntity } from '../infrastructure/entities/problem-setup.entity';
import { Inject } from '@nestjs/common';
import {
  CreateTestOptions,
  TestFactory,
} from 'src/problem/domain/test-factory';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';

export type CreateProblemSetupOptions = Readonly<{
  problemId: string;
  languageId: number;
  initialCode: string;
  tests?: CreateTestOptions[];
  solution: Submission;
}>;

export class ProblemSetupFactory {
  @Inject() private readonly testFactory: TestFactory;
  @Inject() private readonly submissionFactory: SubmissionFactory;

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

  async createFromEntity(
    problemSetupEntity: ProblemSetupEntity,
  ): Promise<ProblemSetup> {
    const solution = problemSetupEntity?.solution
      ? this.submissionFactory.createFromEntity(problemSetupEntity.solution)
      : null;
    return new ProblemSetupImplementation({
      ...problemSetupEntity,
      problemId: new IdImplementation(problemSetupEntity.problemId),
      languageId: new IdImplementation(problemSetupEntity.languageId),
      language: null,
      problem: null,
      tests: problemSetupEntity.tests.map((test) =>
        this.testFactory.createFromEntity(test),
      ),
      solution,
    });
  }
}
