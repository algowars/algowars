import { Injectable } from '@nestjs/common';
import { CodeExecutionEvaluationResult } from 'lib/code-execution/code-execution-evaluation-result';
import { CodeExecutionResponse } from 'lib/code-execution/code-execution-service';
import { Judge0CodeExecutionEvaluator } from 'lib/code-execution/judge0/judge0-code-execution-evaluator';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@Injectable()
export class JavaScriptJudge0CodeExecutionEvaluator
  implements Judge0CodeExecutionEvaluator
{
  evaluate(
    submissionResult: CodeExecutionResponse,
  ): CodeExecutionEvaluationResult {
    return this.parseUvuLibrary(submissionResult);
  }

  private parseJudge0(submissionResult: CodeExecutionResponse): any {
    return {};
  }

  private parseUvuLibrary(
    submissionResult: CodeExecutionResponse,
  ): CodeExecutionEvaluationResult {
    const stdout = submissionResult.getStdout();

    // Parse stdout for uvu result information
    const resultLines = stdout?.split('\n') || [];
    const summary = {
      passed: 0,
      failed: 0,
      skipped: 0,
      details: [] as string[],
    };

    let total = 0;

    resultLines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Total:')) {
        total = parseInt(trimmedLine.split(':')[1].trim(), 10);
      } else if (trimmedLine.startsWith('Passed:')) {
        summary.passed = parseInt(trimmedLine.split(':')[1].trim(), 10);
      } else if (trimmedLine.startsWith('Skipped:')) {
        summary.skipped = parseInt(trimmedLine.split(':')[1].trim(), 10);
      }
    });

    summary.failed = Math.max(0, total - (summary.passed + summary.skipped));

    // Determine the evaluation status based on results
    const status =
      summary.failed > 0
        ? SubmissionStatus.WRONG_ANSWER
        : SubmissionStatus.ACCEPTED;

    return {
      status,
      stdout: stdout,
      summary,
    };
  }
}
