import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { CodeExecutionEvaluationResult } from '../code-execution-evaluation-result';

export interface Judge0CodeExecutionEvaluator {
  evaluate(
    submissionResult: SubmissionResultEntity,
  ): CodeExecutionEvaluationResult;
}
