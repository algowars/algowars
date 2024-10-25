import { Injectable, NotFoundException } from '@nestjs/common';
import { JavaScriptCodeExecutionContext } from './languages/javascript-code-execution-context';
import { CodeExecutionContext } from './code-execution-context';
import { Language } from 'src/problem/domain/language';

@Injectable()
export class CodeExecutionContextFactory {
  constructor(
    private readonly jsExecutionContext: JavaScriptCodeExecutionContext,
  ) {}

  createContext(language: Language): CodeExecutionContext {
    switch (language.getId().toNumber()) {
      case CodeExecutionContextFactory.JAVASCRIPT_LANGUAGE_ID:
        return this.jsExecutionContext;
      default:
        throw new NotFoundException(
          `Execution context for language ${language.getName()} not found`,
        );
    }
  }

  private static readonly JAVASCRIPT_LANGUAGE_ID = 93;
}
