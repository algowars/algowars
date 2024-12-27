import { CodeExecutionContext } from 'lib/code-execution/code-execution-context';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { Account } from 'src/account/domain/account';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Language } from 'src/problem/domain/language';
import { SubmissionResult } from './submission-result';
import { SubmissionStatus } from './submission-status';
import { Problem } from 'src/problem/domain/problem';
import { SubmissionCreatedEvent } from './events/submission-created-event';

export interface SubmissionProperties extends BaseDomainProperties {
  sourceCode: string;
  codeExecutionEngine: CodeExecutionEngines;
  createdBy: Account;
  language: Language;
  results: SubmissionResult[];
  status: SubmissionStatus;
  problem?: Problem;
}

export interface Submission extends BaseDomainAggregateRoot {
  getSourceCode(): string;
  getCodeExecutionEngine(): CodeExecutionEngines;
  getCreatedBy(): Account;
  getLanguage(): Language;
  getProblem(): Problem;
  getResults(): SubmissionResult[];
  setResult(index: number, result: SubmissionResult): void;
  setResults(newResults: SubmissionResult[]): void;
  create(): void;
}

export class SubmissionImplementation
  extends BaseDomainAggregateRootImplementation
  implements Submission
{
  private readonly sourceCode: string;
  private readonly codeExecutionEngine: CodeExecutionEngines;
  private readonly createdBy: Account;
  private readonly language: Language;
  private readonly problem: Problem;
  private results: SubmissionResult[];

  constructor(properties: SubmissionProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  create(): void {
    this.apply(new SubmissionCreatedEvent(this.getId()));
  }

  getSourceCode(): string {
    return this.sourceCode;
  }

  getCodeExecutionEngine(): CodeExecutionEngines {
    return this.codeExecutionEngine;
  }

  getCreatedBy(): Account {
    return this.createdBy;
  }

  getLanguage(): Language {
    return this.language;
  }

  getProblem(): Problem {
    return this.problem;
  }

  getResults(): SubmissionResult[] {
    return this.results;
  }

  setResult(index: number, result: SubmissionResult): number {
    if (index > this.results.length || index < this.results.length) {
      return -1;
    }

    this.results[index] = result;
    return 0;
  }

  setResults(results: SubmissionResult[]): void {
    this.results = results;
  }
}
