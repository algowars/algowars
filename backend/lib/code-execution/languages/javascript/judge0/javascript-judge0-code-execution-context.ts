import { Injectable } from '@nestjs/common';
import { CodeExecutionContext } from 'lib/code-execution/code-execution-context';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import {
  CodeExecutionRequest,
  CodeExecutionRequestImplementation,
  CodeExecutionResponse,
} from 'lib/code-execution/code-execution-service';
import { Judge0CodeExecutionService } from 'lib/code-execution/judge0/judge0-code-execution-service';
import { S3Service } from 'lib/s3.module';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';

@Injectable()
export class JavaScriptJudge0CodeExecutionContext
  implements CodeExecutionContext
{
  constructor(
    private readonly judge0CodeExecutionService: Judge0CodeExecutionService,
    private readonly s3Service: S3Service,
  ) {}

  getEngine(): CodeExecutionEngines {
    return CodeExecutionEngines.JUDGE0;
  }

  async build({
    sourceCode,
    additionalTestFiles,
    languageId,
    input = '',
    expectedOutput = '',
  }: {
    sourceCode?: string;
    additionalTestFiles?: AdditionalTestFile | null;
    languageId: number;
    input?: string;
    expectedOutput?: string;
  }): Promise<CodeExecutionRequest> {
    console.log('ADDITIONAL FILES: ', additionalTestFiles);
    const request = {
      sourceCode: sourceCode ? Buffer.from(sourceCode).toString('base64') : '',
      languageId,
      stdin: input ? Buffer.from(input).toString('base64') : '',
      additionalFiles: '',
      expectedOutput: expectedOutput
        ? Buffer.from(expectedOutput).toString('base64')
        : '',
    };

    if (additionalTestFiles) {
      request['additionalFiles'] = await this.getAdditionalFiles(
        additionalTestFiles.getFileName(),
      );
    }

    return new CodeExecutionRequestImplementation(request);
  }

  async batchBuild(
    contexts: {
      sourceCode?: string;
      additionalFiles?: AdditionalTestFile;
      languageId: number;
      input?: string;
      expectedOutput: any;
    }[],
  ): Promise<CodeExecutionRequest[]> {
    return Promise.all(contexts.map((context) => this.build(context)));
  }

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      return await this.judge0CodeExecutionService.run(request);
    } catch (error) {
      console.log(error);
    }
  }

  async batchExecute(
    codeExecutionRequests: CodeExecutionRequest[],
  ): Promise<CodeExecutionResponse[]> {
    console.log('CODE EXECUTION REQUESTS: ', codeExecutionRequests);
    try {
      return await this.judge0CodeExecutionService.batchRun(
        codeExecutionRequests,
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  private async getAdditionalFiles(s3Key: string): Promise<string> {
    try {
      const sourceCodeBuffer = await this.s3Service.getObject(
        'algowars',
        s3Key,
      );
      return sourceCodeBuffer.toString('utf-8');
    } catch (error) {
      throw new Error('Failed to retrieve additional files from s3');
    }
  }
}
