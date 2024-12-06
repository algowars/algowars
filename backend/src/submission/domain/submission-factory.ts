import { forwardRef, Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission, SubmissionImplementation } from './submission';
import { Account } from 'src/account/domain/account';
import { SubmissionEntity } from '../infrastructure/entities/submission.entity';
import { Language } from 'src/problem/domain/language';
import { CodeExecutionEngine } from 'lib/code-execution/code-execution-engines';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { SubmissionResultFactory } from './submission-result-factory';
import { AccountFactory } from 'src/account/domain/account-factory';
import { LanguageFactory } from 'src/problem/domain/language-factory';
import { ProblemFactory } from 'src/problem/domain/problem-factory';

type CreateSubmissionOptions = Readonly<{
  id: Id;
  language: Language;
  createdBy: Account;
  sourceCode: string;
  results: {
    token: string;
  }[];
  codeExecutionContext: CodeExecutionEngine;
}>;

export class SubmissionFactory
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
