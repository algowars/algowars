import { IQueryResult } from '@nestjs/cqrs';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class FindSubmissionByIdResult implements IQueryResult {
  sourceCode: string;
  codeExecutionEngine: CodeExecutionEngines;
  createdBy: {
    id: string;
    username: string;
  };
  language: {
    id: number;
    name: string;
  };
  results: {
    token: string;
    sourceCode?: string;
    languageId?: number;
    stdin?: string;
    stdout?: string;
    time?: string;
    memory?: number;
    stderr?: string;
    expectedOutput?: string;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    version?: number;
    status: SubmissionStatus;
  }[];
}
