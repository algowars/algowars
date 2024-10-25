import { CodeExecutionContext } from '../code-execution-context';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionService,
} from '../code-execution-service';
import { Injectable } from '@nestjs/common';
import { S3Service } from 'lib/s3.module';

@Injectable()
export class JavaScriptCodeExecutionContext extends CodeExecutionContext {
  constructor(
    codeExecutionService: CodeExecutionService,
    private readonly s3Service: S3Service,
  ) {
    super(codeExecutionService);
  }

  async build(
    sourceCode: string,
    input: string = '',
  ): Promise<CodeExecutionRequest> {
    return {
      source_code: Buffer.from(sourceCode).toString('base64'),
      language_id: 93,
      stdin: input,
      additional_files: await this.getAdditionalFiles(
        'uvu-testing-library.txt',
      ),
    };
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
    return await this.codeExecutionService.run(request);
  }
}
