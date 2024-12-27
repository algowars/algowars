import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSetupQuery } from './get-problem-setup.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { LanguageQuery } from '../language-query';
import { GetProblemSetupResult } from './get-problem-setup-result';
import { LanguageErrorMessage } from 'src/problem/domain/language-error-message';
import { IdImplementation } from 'src/common/domain/id';

@QueryHandler(GetProblemSetupQuery)
export class GetProblemSetupHandler
  implements IQueryHandler<GetProblemSetupQuery, GetProblemSetupResult>
{
  @Inject(ProblemInjectionToken.LANGUAGE_QUERY)
  readonly languageQuery: LanguageQuery;

  async execute(query: GetProblemSetupQuery): Promise<GetProblemSetupResult> {
    const result = await this.languageQuery.findByIdWithTestFiles(
      new IdImplementation(query.languageId),
    );

    if (!result) {
      throw new NotFoundException(LanguageErrorMessage.LANGUAGE_NOT_FOUND);
    }

    return {
      initialCode: result.language.getInitialCode(),
      initialSolution: result.language.getInitialSolution(),
      testFile: result.additionalTestFiles[0].getInitialTestFile(),
      additionalTestFiles: result.additionalTestFiles.map((testFile) => ({
        id: testFile.getId().toString(),
        name: testFile.getName(),
      })),
    };
  }
}
