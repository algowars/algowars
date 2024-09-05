import { Inject, Injectable } from '@nestjs/common';
import {
  ENTITY_ID_TRANSFORMER,
  EntityIdTransformer,
  readConnection,
} from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async findBySlug(slug: string): Promise<FindProblemBySlugResult | null> {
    const problem = await readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ slug: slug });

    return {
      id: this.entityIdTransformer.from(problem.id),
      title: problem.title,
      slug: problem.slug,
      question: problem.question,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
      deletedAt: problem.deletedAt,
    };
  }
}
