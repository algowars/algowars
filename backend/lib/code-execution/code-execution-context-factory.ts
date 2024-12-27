import { Injectable, NotFoundException } from '@nestjs/common';
import { JavaScriptJudge0CodeExecutionContext } from './languages/javascript/judge0/javascript-judge0-code-execution-context';
import { Language } from 'src/problem/domain/language';
import { CodeExecutionContext } from './code-execution-context';

@Injectable()
export class CodeExecutionContextFactory {
  constructor(
    private readonly jsJudge0ExecutionContext: JavaScriptJudge0CodeExecutionContext,
  ) {}

  createContext(language: Language): CodeExecutionContext {
    console.log('LANGUAGE: ', language);
    switch (language.getId().toNumber()) {
      case CodeExecutionContextFactory.JAVASCRIPT_LANGUAGE_ID:
        return this.jsJudge0ExecutionContext;
      default:
        throw new NotFoundException(
          `Execution context for language "${language.getName()}" not found`,
        );
    }
  }

  private static readonly JAVASCRIPT_LANGUAGE_ID = 93;
}
