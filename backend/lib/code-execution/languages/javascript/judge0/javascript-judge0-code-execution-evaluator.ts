import { Injectable } from '@nestjs/common';
import {
  CodeExecutionEvaluationResult,
  SubmissionResultStatus,
} from 'lib/code-execution/code-execution-evaluation-result';
import { Judge0CodeExecutionEvaluator } from 'lib/code-execution/judge0/judge0-code-execution-evaluator';
import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';

@Injectable()
export class JavaScriptJudge0CodeExecutionEvaluator
  implements Judge0CodeExecutionEvaluator
{
  evaluate(
    submissionResult: SubmissionResultEntity,
  ): CodeExecutionEvaluationResult {
    return this.parseUvuLibrary(submissionResult);
  }

  private parseUvuLibrary(
    submissionResult: SubmissionResultEntity,
  ): CodeExecutionEvaluationResult {
    const { stdout, stderr } = submissionResult;

    // Check if there are any errors in stderr
    if (stderr && stderr.trim()) {
      return {
        status: SubmissionResultStatus.WRONG_ANSWER,
        stdout: stdout,
        summary: {
          passed: 0,
          failed: 0,
          skipped: 0,
          details: [stderr],
        },
      };
    }

    // Parse stdout for uvu result information
    const resultLines = stdout?.split('\n') || [];
    const summary = {
      passed: 0,
      failed: 0,
      skipped: 0,
      details: [] as string[],
    };

    resultLines.forEach((line) => {
      if (line.includes('✔')) {
        summary.passed += 1;
      } else if (line.includes('✘')) {
        summary.failed += 1;
        summary.details.push(line.trim());
      } else if (line.includes('○')) {
        summary.skipped += 1;
      }
    });

    // Determine the evaluation status based on results
    const status =
      summary.failed > 0
        ? SubmissionResultStatus.WRONG_ANSWER
        : SubmissionResultStatus.ACCEPTED;

    return {
      status,
      stdout: stdout,
      summary,
    };
  }
}
