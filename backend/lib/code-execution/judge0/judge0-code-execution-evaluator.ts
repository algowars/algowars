import { TestType } from 'src/problem/domain/test-type';
import { CodeExecutionEvaluationResult } from '../code-execution-evaluation-result';

import { CodeExecutionResponse } from '../code-execution-service';

export interface Judge0CodeExecutionEvaluator {
  evaluate(
    submissionResult: CodeExecutionResponse,
    testType: TestType,
  ): CodeExecutionEvaluationResult;
}
