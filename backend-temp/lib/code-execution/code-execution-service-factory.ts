import { Injectable } from '@nestjs/common';
import { Judge0CodeExecutionService } from './judge0/judge0-code-execution-service';
import { CodeExecutionService } from './code-execution-service';

@Injectable()
export class CodeExecutionServiceFactory {
  constructor(
    private readonly judge0CodeExecutionService: Judge0CodeExecutionService,
  ) {}

  createService(): CodeExecutionService {
    return this.judge0CodeExecutionService;
  }
}
