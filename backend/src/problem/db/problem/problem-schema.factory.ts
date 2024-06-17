import { Injectable } from '@nestjs/common';
import { Problem } from 'src/problem/entities/problem.entity';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { ProblemSchema } from './problem.schema';
import { TestSchemaFactory } from '../test/test-schema.factory';
import { ProblemSetupSchemaFactory } from '../problem-setup/problem-setup-schema.factory';

@Injectable()
export class ProblemSchemaFactory
  implements EntitySchemaFactory<ProblemSchema, Problem>
{
  constructor(
    private readonly testSchemaFactory: TestSchemaFactory,
    private readonly problemSetupSchemaFactory: ProblemSetupSchemaFactory,
  ) {}

  create(problem: Problem): ProblemSchema {
    return {
      id: problem.getId(),
      title: problem.getTitle(),
      question: problem.getQuestion(),
      slug: problem.getSlug(),
      rating: problem.getRating(),
      createdAt: problem.getCreatedAt(),
      updatedAt: problem.getUpdatedAt(),
      setups: problem.getSetups() as any,
      tests: problem.getTests() as any,
    };
  }

  createFromSchema(problemSchema: ProblemSchema): Problem {
    let setups = [];
    let tests = [];

    if (problemSchema.setups) {
      setups = problemSchema.setups.map((setup) =>
        this.problemSetupSchemaFactory.createFromSchema(setup),
      );
    }

    if (problemSchema.tests) {
      tests = problemSchema.tests.map((test) =>
        this.testSchemaFactory.createFromSchema(test),
      );
    }
    return new Problem(
      problemSchema.id,
      problemSchema.title,
      problemSchema.question,
      problemSchema.slug,
      problemSchema.rating,
      problemSchema.createdAt,
      problemSchema.updatedAt,
      setups,
      tests,
    );
  }
}
