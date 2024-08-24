import { Injectable } from '@nestjs/common';
import { Problem } from 'src/problem/entities/problem.entity';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { ProblemSchema } from './problem.schema';
import { TestSchemaFactory } from '../test/test-schema.factory';
import { ProblemSetupSchemaFactory } from '../problem-setup/problem-setup-schema.factory';

@Injectable()
export class ProblemSchemaFactory
  implements EntitySchemaFactory<ProblemSchema, Problem> {
  constructor(
    private readonly testSchemaFactory: TestSchemaFactory,
    private readonly problemSetupSchemaFactory: ProblemSetupSchemaFactory,
  ) { }

  /**
   * Creates a ProblemSchema object from a Problem entity.
   * This method is used to map the domain entity to the persistence schema.
   * 
   * @param problem - The Problem entity to convert.
   * @returns A ProblemSchema object containing the persisted data.
   */
  create(problem: Problem): ProblemSchema {
    return {
      id: problem.getId(),
      title: problem.getTitle(),
      question: problem.getQuestion(),
      slug: problem.getSlug(),
      rating: problem.getRating(),
      createdAt: problem.getCreatedAt(),
      updatedAt: problem.getUpdatedAt(),
      setups: problem.getSetups() as any, // Converting setups to a format suitable for persistence
      tests: problem.getTests() as any, // Converting tests to a format suitable for persistence
      tags: problem.getTags() as any, // Converting tags to a format suitable for persistence
    };
  }

  /**
   * Creates a Problem entity from a ProblemSchema object.
   * This method is used to map the persistence schema back to the domain entity.
   * 
   * @param problemSchema - The ProblemSchema object to convert.
   * @returns A Problem entity containing the domain logic.
   */
  createFromSchema(problemSchema: ProblemSchema): Problem {
    let setups = [];
    let tests = [];

    // Convert each ProblemSetupSchema to a domain entity if setups exist
    if (problemSchema.setups) {
      setups = problemSchema.setups.map((setup) =>
        this.problemSetupSchemaFactory.createFromSchema(setup),
      );
    }

    // Convert each TestSchema to a domain entity if tests exist
    if (problemSchema.tests) {
      tests = problemSchema.tests.map((test) =>
        this.testSchemaFactory.createFromSchema(test),
      );
    }

    // Create and return a new Problem entity with the converted data
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
