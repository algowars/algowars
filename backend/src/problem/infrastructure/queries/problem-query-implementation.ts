import { Inject, Injectable } from '@nestjs/common';
import {
  ENTITY_ID_TRANSFORMER,
  EntityIdTransformer,
  readConnection,
} from 'src/lib/database.module';
import { FindProblemResult } from 'src/problem/application/queries/find-problem-result';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async findBySlug(slug: string): Promise<FindProblemResult | null> {
    const problem = await readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ slug: slug });

    problem.id = this.entityIdTransformer.from(problem.id);
  }
}
