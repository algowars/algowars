import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  findBySlug(slug: string): Promise<FindProblemBySlugResult | null> {
    return readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ slug: slug });
  }
}
