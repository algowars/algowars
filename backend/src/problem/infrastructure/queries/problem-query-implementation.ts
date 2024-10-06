import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';
import {
  PageResult,
  PageResultImplementation,
} from 'src/common/pagination/page-result';
import { GetProblemsPageableResult } from 'src/problem/application/queries/get-problems-pageable-query/get-problems-pageable-result';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  findBySlug(slug: string): Promise<FindProblemBySlugResult | null> {
    return readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ slug: slug });
  }

  async getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetProblemsPageableResult>> {
    const pageResult = await Pagination.paginate<GetProblemsPageableResult>(
      ProblemEntity,
      {
        page,
        size,
        timestamp,
        resultsTransformer: (results: ProblemEntity[]) => {
          return results.map((problemEntity) => {
            const createdBy = problemEntity?.createdBy;

            const result: GetProblemsPageableResult = {
              id: problemEntity.id,
              slug: problemEntity.slug,
              createdAt: problemEntity.createdAt,
            };

            if (createdBy) {
              result['createdBy'] = {
                username: problemEntity?.createdBy.username,
              };
            }
            return result;
          });
        },
        relations: ['createdBy'],
      },
    );

    return pageResult;
  }
}
