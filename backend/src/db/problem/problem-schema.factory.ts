import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from '../entity-schema.factory';
import { ProblemSchema } from './problem.schema';
import { Problem } from 'src/problem/entities/problem.entity';

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
