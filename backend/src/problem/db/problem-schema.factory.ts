import { Injectable } from '@nestjs/common';
import { ProblemSchema } from './problem.schema';
import { Problem } from 'src/problem/entities/problem.entity';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';

@Injectable()
export class ProblemSchemaFactory
  implements EntitySchemaFactory<ProblemSchema, Problem>
{
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
    return new Problem(
      problemSchema.id,
      problemSchema.title,
      problemSchema.question,
      problemSchema.slug,
      problemSchema.rating,
      problemSchema.createdAt,
      problemSchema.updatedAt,
    );
  }
}
