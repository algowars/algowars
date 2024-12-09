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

export type CreateProblemSetupOptions = Readonly<{
  problemId: string;
  languageId: number;
  initialCode: string;
  tests?: CreateTestOptions[];
  solution: Submission;
}>;

@Injectable()
export class ProblemSetupFactory
  implements EntityDomainFactory<ProblemSetup, ProblemSetupEntity>
{
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

  createFromEntity(problemSetupEntity: ProblemSetupEntity): ProblemSetup {
    if (!problemSetupEntity) {
      return null;
    }

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

  createEntityFromDomain(domain: ProblemSetup): ProblemSetupEntity {
    if (!domain) {
      return null;
    }

    let tests = [];

    if (Array.isArray(domain.getTests())) {
      tests = domain
        .getTests()
        .map((test) => this.testFactory.createEntityFromDomain(test));
    }

    return {
      problemId: domain.getProblemId().toString(),
      languageId: domain.getLanguageId().toNumber(),
      language: this.languageFactory.createEntityFromDomain(
        domain.getLanguage(),
      ),
      solution: this.submissionFactory.createEntityFromDomain(
        domain.getSolution(),
      ),
      tests,
      initialCode: domain.getInitialCode(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
    };
  }
}
