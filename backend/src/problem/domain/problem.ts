import { AggregateRoot } from '@nestjs/cqrs';
import { ExampleTestcase } from './example-testcase';
import { Id } from 'src/common/domain/id';

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
    version: number;
  }>
>;

export type ProblemProperties = ProblemEssentialProperties &
  Required<ProblemOptionalProperties>;

export interface Problem {
  compareId: (id: Id) => boolean;
  commit: () => void;
}

export class ProblemImplementation extends AggregateRoot implements Problem {
  private readonly id: Id;
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly exampleTestcases: ExampleTestcase[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: ProblemProperties) {
    super();
    Object.assign(this, properties);
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }
}
