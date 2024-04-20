import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';
import {
  catchError,
  delay,
  firstValueFrom,
  map,
  retryWhen,
  tap,
  throwError,
} from 'rxjs';
import { Test } from 'src/data-model/entities';
import { CreateJudgeSubmission } from 'src/data-model/models/create-judge-submission';
import { JudgeSubmission } from 'src/data-model/models/judge-submission';
import { JudgeSubmissionResponse } from 'src/data-model/models/judge-submission-response';

@Injectable()
export class EvaluatorService {
  constructor(private readonly httpService: HttpService) {}

  async batchEvaluate(
    createSubmissions: CreateJudgeSubmission[],
  ): Promise<JudgeSubmissionResponse[]> {
    try {
      const data = this.mapEvaluation(createSubmissions);

      const params = {
        base64_encoded: 'true',
      };

      const response = await firstValueFrom(
        this.httpService.post('/submissions/batch', data, { params }),
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || 'An unexpected error occurred';
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: statusCode,
          error: message,
        },
        statusCode,
      );
    }
  }

  async getBatchSubmissions(
    submissionIds: string[],
  ): Promise<JudgeSubmission[]> {
    const params = {
      base64_encoded: 'false',
      fields: '*',
      tokens: submissionIds.join(','),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get('/submissions/batch', { params }),
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || 'An unexpected error occurred';
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: statusCode,
          error: message,
        },
        statusCode,
      );
    }
  }

  async getSubmission(submissionId: string): Promise<JudgeSubmission> {
    const params = {
      base64_encoded: 'true',
      fields: '*',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`/submissions/${submissionId}`, { params }),
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || 'An unexpected error occurred';
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: statusCode,
          error: message,
        },
        statusCode,
      );
    }
  }

  private mapEvaluation(createSubmissions: CreateJudgeSubmission[]) {
    return {
      submissions: createSubmissions.map((submission) => ({
        language_id: submission.language_id,
        source_code: this.encode(submission.source_code),
        expected_output: this.encode(submission.expected_output),
        stdin: this.encode(submission.stdin),
      })),
    };
  }

  public static createJudgeSubmissionTests(
    source_code: string,
    language_id: number,
    tests: Test[],
  ): CreateJudgeSubmission[] {
    return tests.map((test) => ({
      language_id,
      source_code,
      expected_output: test.expectedOutput,
      stdin: test.inputs.map((input) => input.input).join(','),
    }));
  }

  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes: string) {
    return Base64.decode(bytes);
  }
}
