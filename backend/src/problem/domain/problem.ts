import { ExampleTestcase } from './example-testcase';
import { Id } from 'src/common/domain/id';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type ProblemEssentialProperties = Readonly<
  Required<{
    id: Id;
    title: string;
    slug: string;
    question: string;
  }>
>;

export type ProblemProperties = ProblemEssentialProperties &
  BaseDomainProperties;

export interface Problem extends BaseDomainAggregateRoot {
  getTitle(): string;
  getQuestion(): string;
  getSlug(): string;
  getExampleTestcases(): ExampleTestcase[];
}

export class ProblemImplementation
  extends BaseDomainAggregateRootImplementation
  implements Problem
{
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly exampleTestcases: ExampleTestcase[];

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

  getExampleTestcases(): ExampleTestcase[] {
    return this.exampleTestcases;
  }
}
