import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission, SubmissionImplementation } from './submission';
import { Account } from 'src/account/domain/account';
import { SubmissionEntity } from '../infrastructure/entities/submission.entity';
import { Language } from 'src/problem/domain/language';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { SubmissionResultFactory } from './submission-result-factory';
import { Problem } from 'src/problem/domain/problem';

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
export class SubmissionFactory implements EntityDomainFactory<Submission> {
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
