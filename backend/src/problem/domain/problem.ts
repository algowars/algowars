import { Account } from 'src/account/domain/account';
import { ProblemStatus } from './problem-status';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Tag } from './tag';
import { SubmissionType } from './submission-type';
import { Test } from './test';
import { TestCase } from './test_case';

export interface ProblemProperties extends BaseDomainProperties {
  title?: string;
  slug?: string;
  question?: string;
  status?: ProblemStatus;
  createdBy?: Account;
  tags?: Tag[];
  difficulty?: number;
  submissionType?: SubmissionType;
  tests?: Test[];
  testCases?: TestCase[];
}

export interface Problem extends BaseDomainAggregateRoot {
  getTitle(): string;
  getQuestion(): string;
  getSlug(): string;
  getCreatedBy(): Account;
  getStatus(): ProblemStatus;
  getTags(): Tag[];
  getDifficulty(): number;
  setDifficulty(newDifficulty: number): void;
  getSubmissionType(): SubmissionType;
  getAllowedTests(): Test[];
  getAllowedTestCases(): TestCase[];
}

export class ProblemImplementation
  extends BaseDomainAggregateRootImplementation
  implements Problem
{
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly createdBy?: Account;
  private readonly status: ProblemStatus;
  private readonly tags: Tag[];
  private difficulty: number;
  private readonly submissionType: SubmissionType;
  private readonly tests: Test[];
  private readonly testCases: TestCase[];

  constructor(properties: ProblemProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getTitle(): string {
    return this.title;
  }

  getQuestion(): string {
    return this.question;
  }

  getSlug(): string {
    return this.slug;
  }

  getCreatedBy(): Account | null {
    return this.createdBy ?? null;
  }

  getStatus(): ProblemStatus {
    return this.status;
  }

  getDifficulty(): number {
    return this.difficulty;
  }

  setDifficulty(newDifficulty: number): void {
    if (newDifficulty < 0) {
      throw new Error('new Difficulty rating needs to be greated than zero.');
    }

    this.difficulty = newDifficulty;
  }

  getTags(): Tag[] {
    return this.tags;
  }

  getSubmissionType(): SubmissionType {
    return this.submissionType;
  }

  getAllowedTests(): Test[] {
    return this.tests;
  }

  getAllowedTestCases(): TestCase[] {
    return this.testCases;
  }
}
