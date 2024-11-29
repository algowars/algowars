import { Account } from 'src/account/domain/account';
import { ExampleTestcase } from './example-testcase';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { ProblemSetup, ProblemSetupProperties } from './problem-setup';
import { ProblemStatus } from './problem-status';
import { Submission } from 'src/submission/domain/submission';

export type ProblemEssentialProperties = Readonly<
  Required<{
    title: string;
    slug: string;
    question: string;
    createdBy: Account;
    status: ProblemStatus;
  }>
>;

export type ProblemOptionalProperties = Readonly<
  Partial<{
    setups: ProblemSetup[];
  }>
>;

export type ProblemProperties = ProblemEssentialProperties &
  ProblemOptionalProperties &
  BaseDomainProperties;

export interface Problem extends BaseDomainAggregateRoot {
  getTitle(): string;
  getQuestion(): string;
  getSlug(): string;
  getExampleTestcases(): ExampleTestcase[];
  getCreatedBy(): Account;
  getSetups(): ProblemSetup[];
  getStatus(): ProblemStatus;
  hasSetups(): boolean;
}

export class ProblemImplementation
  extends BaseDomainAggregateRootImplementation
  implements Problem
{
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly exampleTestcases: ExampleTestcase[];
  private readonly createdBy: Account;
  private readonly setups?: ProblemSetup[];
  private readonly status: ProblemStatus;

  constructor(properties: ProblemProperties) {
    super(properties);
    Object.assign(this, properties);
    this.setups = properties.setups ?? [];
  }

  getCreatedBy(): Account {
    return this.createdBy;
  }

  getExampleTestcases(): ExampleTestcase[] {
    return this.exampleTestcases;
  }

  getQuestion(): string {
    return this.question;
  }

  getSlug(): string {
    return this.slug;
  }

  getTitle(): string {
    return this.title;
  }

  getSetups(): ProblemSetup[] {
    return this.setups;
  }

  hasSetups(): boolean {
    return this.getSetups().length > 0;
  }

  getStatus(): ProblemStatus {
    return this.status;
  }
}
