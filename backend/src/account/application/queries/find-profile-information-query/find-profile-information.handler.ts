import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProfileInformationQuery } from './find-profile-information.query';
import { FindProfileInformationResult } from './find-profile-information-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';
import { Id } from 'src/common/domain/id';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@QueryHandler(FindProfileInformationQuery)
export class FindProfileInformationHandler
  implements
    IQueryHandler<FindProfileInformationQuery, FindProfileInformationResult>
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  readonly accountQuery: AccountQuery;

  async execute(
    query: FindProfileInformationQuery,
  ): Promise<FindProfileInformationResult> {
    const data = await this.accountQuery.findByUsername(
      query.username.toString(),
    );

    if (!data) {
      throw new NotFoundException(AccountErrorMessage.ACCOUNT_NOT_FOUND);
    }

    return {
      username: data.getUsername().toString(),
      createdAt: data.getCreatedAt(),
      ranks: Array.isArray(data.getElos())
        ? data.getElos().map((elo) => ({
            gameMode: elo.getGameMode(),
            elo: elo.getElo(),
          }))
        : [],
      recentSubmissions: await this.getRecentSubmissions(data.getId()),
    };
  }

  private async getRecentSubmissions(accountId: Id): Promise<
    {
      problemSlug: string;
      problemId: string;
      problemTitle: string;
      status: SubmissionStatus | null;
      createdAt: Date;
      id: string;
    }[]
  > {
    return this.accountQuery.findRecentSubmissions(accountId);
  }
}
