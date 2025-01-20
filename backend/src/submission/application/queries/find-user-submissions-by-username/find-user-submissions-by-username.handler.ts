import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserSubmissionsByUsernameQuery } from './find-user-submissions-by-username.query';
import { FindUserSubmissionsByUsernameResult } from './find-user-submissions-by-username-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { SubmissionInjectionToken } from '../../injection-token';
import { SubmissionQuery } from '../submission-query';
import { AccountInjectionToken } from 'src/account/application/injection-token';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';

@QueryHandler(FindUserSubmissionsByUsernameQuery)
export class FindUserSubmissionsByUsernameHandler
  implements
    IQueryHandler<
      FindUserSubmissionsByUsernameQuery,
      FindUserSubmissionsByUsernameResult
    >
{
  @Inject(SubmissionInjectionToken.SUBMISSION_QUERY)
  private readonly submissionQuery: SubmissionQuery;
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  private readonly accountQuery: AccountQuery;

  async execute(
    query: FindUserSubmissionsByUsernameQuery,
  ): Promise<FindUserSubmissionsByUsernameResult> {
    const foundAccount = await this.accountQuery.findByUsername(
      query.username.toString(),
    );

    if (!foundAccount) {
      throw new NotFoundException(AccountErrorMessage.ACCOUNT_NOT_FOUND);
    }

    const foundSubmissions = await this.submissionQuery.findByUserId(
      foundAccount.getId(),
    );

    if (!foundSubmissions.length) {
      throw new NotFoundException('Submissions not found');
    }

    return {
      submissions: foundSubmissions.map((submission) => ({
        problem: {
          id: submission.getProblem().getId().toString(),
          title: submission.getProblem().getTitle(),
          slug: submission.getProblem().getSlug(),
        },
        sourceCode: submission.getSourceCode(),
        codeExecutionEngine: submission.getCodeExecutionEngine(),
        language: {
          id: submission.getLanguage()?.getId().toNumber(),
          name: submission.getLanguage()?.getName(),
        },
        status: submission.getAggregateStatus(),
        results: submission.getResults()?.map((result) => ({
          token: result.getToken(),
          sourceCode: result.getSourceCode(),
          time: result.getTime(),
          memory: result.getMemory(),
          stderr: result.getStderr(),
          stdout: result.getStdout(),
          status: result.getStatus(),
        })),
        createdAt: submission.getCreatedAt(),
      })),
    };
  }
}
