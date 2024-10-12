import { CodeExecutionContext } from '../code-execution-context';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionService,
} from '../code-execution-service';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

export class JavaScriptCodeExecutionContext extends CodeExecutionContext {
  constructor(codeExecutionService: CodeExecutionService) {
    super(codeExecutionService);
  }

  build(sourceCode: string, input: string = ''): CodeExecutionRequest {
    const additionalFiles = this.buildAdditionalFiles();

    return {
      source_code: sourceCode,
      language_id: 93,
      stdin: input,
      additional_files: additionalFiles,
    };
  }

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return await this.codeExecutionService.run(request);
  }

  private buildAdditionalFiles(): string {
    const zipFilePath = path.join(__dirname, '..', 'additional_files.zip');

    // Read the zipped file as a binary buffer
    const fileBuffer = fs.readFileSync(zipFilePath);

    // Convert the buffer to a base64-encoded string
    return fileBuffer.toString('base64');
  }
}
