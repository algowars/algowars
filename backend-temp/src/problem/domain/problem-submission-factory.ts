import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { AccountFactory } from 'src/account/domain/account-factory';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  Submission,
  SubmissionImplementation,
} from 'src/submission/domain/submission';
import { SubmissionResultFactory } from 'src/submission/domain/submission-result-factory';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { LanguageFactory } from './language-factory';
import { ProblemFactory } from './problem-factory';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { Account } from 'src/account/domain/account';
import { Language } from './language';
import { Problem } from './problem';
import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { LanguageEntity } from '../infrastructure/entities/language.entity';
import { ProblemEntity } from '../infrastructure/entities/problem.entity';

type CreateSubmissionOptions = Readonly<{
  id: Id;
  language: Language;
  createdBy: Account;
  sourceCode: string;
  results: {
    token: string;
  }[];
  codeExecutionContext: CodeExecutionEngines;
  problem: Problem;
}>;

@Injectable()
export class ProblemSubmissionFactory
  implements EntityDomainFactory<Submission>
{
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly submissionResultFactory: SubmissionResultFactory;

  create(options: CreateSubmissionOptions): Submission {
    let results = [];

    if (Array.isArray(options.results)) {
      results = options.results.map(this.submissionResultFactory.create);
    }

    return this.eventPublisher.mergeObjectContext(
      new SubmissionImplementation({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
        submissionResults: results,
      }),
    );
  }
}
