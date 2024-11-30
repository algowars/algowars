import { Inject, Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';
import { PageResult } from 'src/common/pagination/page-result';
import { GetProblemsPageableResult } from 'src/problem/application/queries/get-problems-pageable-query/get-problems-pageable-result';
import { Pagination } from 'src/common/pagination/pagination';
import { Id } from 'src/common/domain/id';
import { Problem } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  @Inject() private readonly problemFactory: ProblemFactory;

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

  async findBySlugWithSubmissions(
    slug: string,
    accountId: Id,
  ): Promise<Problem | null> {
    const entity = await readConnection
      .getRepository(ProblemEntity)
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.createdBy', 'createdBy')
      .leftJoinAndSelect('problem.submissions', 'submission')
      .leftJoinAndSelect('submission.createdBy', 'submissionCreatedBy')
      .where('problem.slug = :slug', { slug })
      .andWhere('submissionCreatedBy.id = :accountId', {
        accountId: accountId.toString(),
      })
      .getOne();

    return this.entityToModel(entity);
  }

  private entityToModel(entity: ProblemEntity): Problem {
    return this.problemFactory.createFromEntity(entity);
  }
}
