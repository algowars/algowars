import { Injectable, NotFoundException } from '@nestjs/common';
import { JavaScriptJudge0CodeExecutionEvaluator } from './languages/javascript/judge0/javascript-judge0-code-execution-evaluator';
import { Language } from 'src/problem/domain/language';
import { Judge0CodeExecutionEvaluator } from './judge0/judge0-code-execution-evaluator';

@Injectable()
export class CodeExecutionEvaluationResultFactory {
  constructor(
    private readonly jsJudge0CodeExecutionEvaluator: JavaScriptJudge0CodeExecutionEvaluator,
  ) {}

  getEvaluator(language: Language): Judge0CodeExecutionEvaluator {
    switch (language.getId().toNumber()) {
      case CodeExecutionEvaluationResultFactory.JAVASCRIPT_LANGUAGE_ID:
        return this.jsJudge0CodeExecutionEvaluator;
      default:
        throw new NotFoundException(
          `Execution Evaluator context for language "${language.getName()}" not found`,
        );
    }
  }

  private static readonly JAVASCRIPT_LANGUAGE_ID = 93;
}
