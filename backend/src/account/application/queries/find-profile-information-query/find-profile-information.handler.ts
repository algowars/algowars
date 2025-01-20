import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProfileInformationQuery } from './find-profile-information.query';
import { FindProfileInformationResult } from './find-profile-information-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';

@QueryHandler(FindProfileInformationQuery)
export class FindProfileInformationHandler
  implements
    IQueryHandler<FindProfileInformationQuery, FindProfileInformationResult>
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  readonly accountQUery: AccountQuery;

  async execute(
    query: FindProfileInformationQuery,
  ): Promise<FindProfileInformationResult> {
    const data = await this.accountQUery.findByUsername(
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
    };
  }
}
