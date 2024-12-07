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
import { CodeExecutionEngine } from 'lib/code-execution/code-execution-engines';
import { Account } from 'src/account/domain/account';
import { Language } from './language';
import { Problem } from './problem';

type CreateSubmissionOptions = Readonly<{
  id: Id;
  language: Language;
  createdBy: Account;
  sourceCode: string;
  results: {
    token: string;
  }[];
  codeExecutionContext: CodeExecutionEngine;
  problem: Problem;
}>;

@Injectable()
export class ProblemSubmissionFactory
  implements EntityDomainFactory<Submission, SubmissionEntity>
{
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly submissionResultFactory: SubmissionResultFactory;
  @Inject() private readonly accountFactory: AccountFactory;
  @Inject() private readonly languageFactory: LanguageFactory;
  @Inject(forwardRef(() => ProblemFactory))
  private readonly problemFactory: ProblemFactory;

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

  createFromEntity(submissionEntity: SubmissionEntity): Submission {
    if (!submissionEntity) {
      return null;
    }

    const id = new IdImplementation(submissionEntity.id);

    let results = [];

    if (Array.isArray(submissionEntity.results)) {
      results = submissionEntity.results.map(
        this.submissionResultFactory.createFromEntity,
      );
    }

    return this.create({
      id,
      createdBy: this.accountFactory.createFromEntity(
        submissionEntity.createdBy,
      ),
      language: this.languageFactory.createFromEntity(
        submissionEntity.language,
      ),
      sourceCode: submissionEntity.sourceCode,
      results,
      codeExecutionContext: submissionEntity.codeExecutionContext,
      problem: this.problemFactory.createFromEntity(submissionEntity.problem),
    });
  }

  createEntityFromDomain(domain: Submission): SubmissionEntity {
    if (!domain) {
      return null;
    }

    let results = [];

    if (Array.isArray(domain.getSubmissionResults())) {
      results = domain
        .getSubmissionResults()
        .map(this.submissionResultFactory.createEntityFromDomain);
    }
    return {
      id: domain.getId().toString(),
      sourceCode: domain.getSourceCode(),
      language: this.languageFactory.createEntityFromDomain(
        domain.getLanguage(),
      ),
      results,
      createdBy: this.accountFactory.createEntityFromDomain(
        domain.getCreatedBy(),
      ),
      codeExecutionContext: domain.getCodeExecutionContext(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
      problem: this.problemFactory.createEntityFromDomain(domain.getProblem()),
    };
  }
}
