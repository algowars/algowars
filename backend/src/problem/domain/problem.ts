import { Account } from 'src/account/domain/account';
import { ExampleTestcase } from './example-testcase';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type ProblemEssentialProperties = Readonly<
  Required<{
    title: string;
    slug: string;
    question: string;
    createdBy: Account;
  }>
>;

export type ProblemProperties = ProblemEssentialProperties &
  BaseDomainProperties;

export interface Problem extends BaseDomainAggregateRoot {
  getTitle(): string;
  getQuestion(): string;
  getSlug(): string;
  getExampleTestcases(): ExampleTestcase[];
  getCreatedBy(): Account;
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

  constructor(properties: ProblemProperties) {
    super(properties);
    Object.assign(this, properties);
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
}
