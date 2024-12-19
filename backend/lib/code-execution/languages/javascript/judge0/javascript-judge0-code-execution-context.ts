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

  async build(
    sourceCode: string,
    additionalTestFile: AdditionalTestFile | null,
    input: string = '',
  ): Promise<CodeExecutionRequest> {
    const request = {
      sourceCode: Buffer.from(sourceCode).toString('base64'),
      languageId: 93,
      stdin: input,
      additionalFiles: '',
    };

    if (additionalTestFile) {
      request['additionalFiles'] = await this.getAdditionalFiles(
        additionalTestFile.getFileName(),
      );
    }

    return new CodeExecutionRequestImplementation(request);
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

  getEngine(): CodeExecutionEngines {
    return CodeExecutionEngines.JUDGE0;
  }

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      return await this.judge0CodeExecutionService.run(request);
    } catch (error) {
      console.log(error);
    }
  }
}
