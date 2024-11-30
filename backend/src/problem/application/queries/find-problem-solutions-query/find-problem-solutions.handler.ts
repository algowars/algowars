import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemSolutionsQuery } from './find-problem-solutions.query';
import { FindProblemSolutionsResult } from './find-problem-solutions-result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { Account } from 'src/account/domain/account';
import { Submission } from 'src/submission/domain/submission';
import { Language } from 'src/problem/domain/language';

@QueryHandler(FindProblemSolutionsQuery)
export class FindProblemSolutionsHandler
  implements
    IQueryHandler<FindProblemSolutionsQuery, FindProblemSolutionsResult>
{
  @Inject(InjectionToken.PROBLEM_QUERY) readonly problemQuery: ProblemQuery;

  async execute(
    query: FindProblemSolutionsQuery,
  ): Promise<FindProblemSolutionsResult> {
    const problemWithSubmissions =
      await this.problemQuery.findBySlugWithSubmissions(
        query.problemSlug,
        query.account.getId(),
      );

    return {
      title: problemWithSubmissions.getTitle(),
      question: problemWithSubmissions.getQuestion(),
      createdBy: this.mapCreatedBy(problemWithSubmissions.getCreatedBy()),
      submissions: this.mapSubmissions(problemWithSubmissions.getSubmissions()),
    };
  }

  private mapCreatedBy(account: Account | null): {
    username: string;
    id: string;
  } {
    if (!account) {
      return null;
    }

    return {
      username: account.getUsername().toString(),
      id: account.getId().toString(),
    };
  }

  private mapSubmissions(submissions: Submission[] | null): {
    id: string;
    sourceCode: string;
    language: { id: number; name: string };
  }[] {
    if (!Array.isArray(submissions)) {
      return [];
    }

    return submissions.map(this.mapSubmission);
  }

  private mapSubmission(submission: Submission | null): {
    id: string;
    sourceCode: string;
    language: { id: number; name: string };
  } | null {
    if (!submission) {
      return null;
    }

    return {
      id: submission.getId().toString(),
      sourceCode: submission.getSourceCode(),
      language: this.mapLanguage(submission.getLanguage()),
    };
  }

  private mapLanguage(
    language: Language | null,
  ): { id: number; name: string } | null {
    if (!language) {
      return null;
    }

    return {
      id: language.getId().toNumber(),
      name: language.getName(),
    };
  }
}
