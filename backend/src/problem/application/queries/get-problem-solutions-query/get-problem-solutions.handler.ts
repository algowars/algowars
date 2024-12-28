import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSolutionsQuery } from './get-problem-solutions.query';
import { GetProblemSolutionsResult } from './get-problem-solutions-result';
import { Inject } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionQuery } from 'src/submission/application/queries/submission-query';

@QueryHandler(GetProblemSolutionsQuery)
export class GetProblemSolutionsHandler
  implements IQueryHandler<GetProblemSolutionsQuery, GetProblemSolutionsResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  @Inject(SubmissionInjectionToken.SUBMISSION_QUERY)
  readonly submissionQuery: SubmissionQuery;

  async execute(
    query: GetProblemSolutionsQuery,
  ): Promise<GetProblemSolutionsResult> {
    const problem = await this.problemQuery.findBySlug(query.slug);

    if (!problem) {
      return null;
    }

    const submissions = await this.submissionQuery.findSolutions(
      problem.getId(),
    );

    console.log(submissions);

    return {
      problem: {
        title: problem.getTitle(),
        question: problem.getQuestion(),
        slug: problem.getSlug(),
        createdAt: problem.getCreatedAt(),
        createdBy: {
          username: problem.getCreatedBy().getUsername().toString(),
        },
      },
      solutions:
        submissions.map((submission) => ({
          id: submission.getId().toString(),
          sourceCode: submission.getSourceCode(),
          language: {
            id: submission.getLanguage().getId().toNumber(),
            name: submission.getLanguage().getName(),
          },
          createdBy: {
            username: submission.getCreatedBy()?.getUsername().toString(),
          },
          createdAt: submission.getCreatedAt(),
          status: submission.getAggregateStatus(),
        })) ?? [],
    };
  }
}
