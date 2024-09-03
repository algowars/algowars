import { AggregateRoot } from '@nestjs/cqrs';
import { ExampleTestcase } from './example-testcase';

export type ProblemEssentialProperties = Readonly<
  Required<{
    id: string;
    title: string;
    slug: string;
    question: string;
  }>
>;

export type ProblemOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type ProblemProperties = ProblemEssentialProperties &
  Required<ProblemOptionalProperties>;

export interface Problem {
  compareId: (id: string) => boolean;
  commit: () => void;
}

export class ProblemImplementation extends AggregateRoot implements Problem {
  private readonly id: string;
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly exampleTestcases: ExampleTestcase[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;

  constructor(properties: ProblemProperties) {
    super();
    Object.assign(this, properties);
  }

  compareId(id: string): boolean {
    return id === this.id;
  }
}
