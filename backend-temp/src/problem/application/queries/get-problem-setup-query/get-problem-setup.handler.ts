import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSetupQuery } from './get-problem-setup.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { GetProblemSetupResult } from './get-problem-setup.result';
import { LanguageQuery } from '../language-query';
import { LanguageErrorMessage } from 'src/problem/domain/language-error-message';

@QueryHandler(GetProblemSetupQuery)
export class GetProblemSetupHandler
  implements IQueryHandler<GetProblemSetupQuery, GetProblemSetupResult>
{
  @Inject(ProblemInjectionToken.LANGUAGE_QUERY)
  readonly languageQuery: LanguageQuery;

  async execute(query: GetProblemSetupQuery): Promise<GetProblemSetupResult> {
    const data = await this.languageQuery.findSetupById(query.languageId);

    if (!data) {
      throw new NotFoundException(LanguageErrorMessage.LANGUAGE_NOT_FOUND);
    }

    return data;
  }
}
