import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { Account } from 'src/account/domain/account';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Language } from 'src/problem/domain/language';

export interface SubmissionProperties extends BaseDomainProperties {
  sourceCode: string;
  codeExecutionEngine: CodeExecutionEngines;
  createdBy: Account;
  language: Language;
}

export interface Submission extends BaseDomainAggregateRoot {
  getSourceCode(): string;
  getCodeExecutionEngine(): CodeExecutionEngines;
  getCreatedBy(): Account;
  getLanguage(): Language;
}

export class SubmissionImplementation
  extends BaseDomainAggregateRootImplementation
  implements Submission
{
  private readonly sourceCode: string;
  private readonly codeExecutionEngine: CodeExecutionEngines;
  private readonly createdBy: Account;
  private readonly language: Language;

  constructor(properties: SubmissionProperties) {
    super(properties);
    Object.assign(this, properties);
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
}
