import { Injectable } from '@nestjs/common';
import { CodeExecutionContext } from 'lib/code-execution/code-execution-context';
import {
  CodeExecutionRequest,
  CodeExecutionRequestImplementation,
  CodeExecutionResponse,
} from 'lib/code-execution/code-execution-service';
import { Judge0CodeExecutionService } from 'lib/code-execution/judge0/judge0-code-execution-service';
import { S3Service } from 'lib/s3.module';

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
    input: string = '',
  ): Promise<CodeExecutionRequest> {
    return new CodeExecutionRequestImplementation({
      source_code: Buffer.from(sourceCode).toString('base64'),
      language_id: 93,
      stdin: input,
      additional_files: await this.getAdditionalFiles(
        'uvu-testing-library.txt',
      ),
    });
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

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return await this.judge0CodeExecutionService.run(request);
  }
}
