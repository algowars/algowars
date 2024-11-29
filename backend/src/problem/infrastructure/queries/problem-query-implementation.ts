import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';
import { PageResult } from 'src/common/pagination/page-result';
import { GetProblemsPageableResult } from 'src/problem/application/queries/get-problems-pageable-query/get-problems-pageable-result';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  async findBySlug(
    slug: string,
    languageId?: number,
  ): Promise<FindProblemBySlugResult | null> {
    const query = readConnection
      .getRepository(ProblemEntity)
      .createQueryBuilder('problem')
      .andWhere('problem.slug = :slug', { slug });

    if (languageId) {
      query.leftJoinAndSelect('problem.setups', 'setup');
      query.andWhere('setup.languageId = :languageId', { languageId });
    }

    const result = await query.getOne();

    let setup = null;

    if (languageId) {
      const setups = await result.setups;

      setup = setups.find((setup) => setup.languageId === languageId);
    }

    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      question: result.question,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
      initialCode: setup ? setup.initialCode : '',
    };
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
              title: problemEntity.title,
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
