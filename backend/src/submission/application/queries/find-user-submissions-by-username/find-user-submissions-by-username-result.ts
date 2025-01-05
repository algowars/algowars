import { IQueryResult } from '@nestjs/cqrs';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class FindUserSubmissionsByUsernameResult implements IQueryResult {
  submissions: {
    problem: {
      id: string;
      title: string;
      slug: string;
    };
    sourceCode: string;
    codeExecutionEngine: CodeExecutionEngines;
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
    status: SubmissionStatus;
    createdAt: Date;
  }[];
}
