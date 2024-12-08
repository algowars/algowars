import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { ProblemEntity } from '../entities/problem.entity';
import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';
import { PageResult } from 'src/common/pagination/page-result';
import { GetProblemsPageableResult } from 'src/problem/application/queries/get-problems-pageable-query/get-problems-pageable-result';
import { Pagination } from 'src/common/pagination/pagination';
import { Account } from 'src/account/domain/account';
import { GetProblemSolutionsResult } from 'src/problem/application/queries/get-problem-solutions-query/get-problem-solutions.result';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { SubmissionResultFactory } from 'src/submission/domain/submission-result-factory';
import { GetProblemWithStatusesResult } from 'src/problem/application/queries/get-problem-with-statuses/get-problem-with-statuses-result';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  @Inject() private readonly submissionResultFactory: SubmissionResultFactory;

  async findBySlug(
    slug: string,
    languageId?: number,
  ): Promise<FindProblemBySlugResult | null> {
    const query = readConnection
      .getRepository(ProblemEntity)
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.createdBy', 'createdBy')
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
      createdBy: result.createdBy?.username,
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

  async findBySlugWithSolutions(
    slug: string,
    account: Account,
  ): Promise<GetProblemSolutionsResult | null> {
    const problem = await readConnection
      .getRepository(ProblemEntity)
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.createdBy', 'createdBy')
      .where('problem.slug = :slug', { slug })
      .getOne();

    if (!problem) {
      return null;
    }

    const submissions = await readConnection
      .getRepository(SubmissionEntity)
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.language', 'language')
      .leftJoinAndSelect('submission.results', 'results')
      .where('submission.problemId = :problemId', { problemId: problem.id })
      .andWhere('submission.createdById = :accountId', {
        accountId: account.getId().toString(),
      })
      .getMany();

    const submissionResults = submissions.map((submission) => ({
      id: submission.id,
      sourceCode: submission.sourceCode,
      language: submission.language
        ? {
            id: submission.language.id,
            name: submission.language.name,
          }
        : null,
      statuses: submission.results?.map((result) => result.status) || [],
      createdAt: submission.createdAt,
    }));

    return {
      problem: {
        id: problem.id,
        title: problem.title,
        slug: problem.slug,
        question: problem.question,
        createdAt: problem.createdAt,
        updatedAt: problem.updatedAt,
        createdBy: problem.createdBy?.username,
      },
      solutions: submissionResults,
    };
  }

  async getAsAdmin(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetProblemWithStatusesResult>> {
    const pageResult = await Pagination.paginate<GetProblemWithStatusesResult>(
      ProblemEntity,
      {
        page,
        size,
        timestamp,
        resultsTransformer: async (results: ProblemEntity[]) => {
          return await Promise.all(
            results.map(
              async (
                problemEntity,
              ): Promise<{
                id: string;
                slug: string;
                title: string;
                createdAt: Date;
                setupStatuses: {
                  name: string;
                  status: SubmissionStatus;
                }[];
              }> => {
                console.log(problemEntity, await problemEntity?.setups);
                const setups = await problemEntity?.setups;
                const createdBy = problemEntity?.createdBy;

                const setupStatuses = await Promise.all(
                  setups.map((setup) => {
                    if (setup?.solution) {
                      return {
                        name: setup.language.name,
                        status: SubmissionEntity.getOverallStatus(
                          setup.solution,
                        ),
                      };
                    }
                    throw new InternalServerErrorException(
                      'Solution is not joined on setup in getAsAdmin',
                    );
                  }),
                );

                const result = {
                  id: problemEntity.id,
                  slug: problemEntity.slug,
                  title: problemEntity.title,
                  createdAt: problemEntity.createdAt,
                  setupStatuses,
                  status: problemEntity.status,
                };

                if (createdBy) {
                  result['createdBy'] = {
                    username: problemEntity?.createdBy.username,
                  };
                }

                return result;
              },
            ),
          );
        },
        relations: [
          'createdBy',
          'setups',
          'setups.solution',
          'setups.solution.results',
        ],
      },
    );

    return pageResult;
  }
}
