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
      console.log('ERROR: ', error);
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

  async pollSubmission(tokens: string[]) {
    const params = {
      base64_encoded: 'true',
      fields: '*',
      tokens: tokens.join(','),
    };

    try {
      const responseData = await firstValueFrom(
        this.httpService.get('/submissions/batch', { params }).pipe(
          map((response) => response.data),
          tap((data) => {
            const allSubmissionsFinal = data.submissions.every(
              (submission) =>
                submission.status.description !== 'In Queue' &&
                submission.status.description !== 'Processing',
            );

            if (!allSubmissionsFinal) {
              throw new Error('All submissions finalized');
            }
          }),
          retryWhen((errors) =>
            errors.pipe(
              delay(5000),
              catchError((error) => {
                if (error.message === 'All submissions finalized') {
                  return throwError(() => new Error('Submissions finalized'));
                }
                return throwError(() => error);
              }),
            ),
          ),
          catchError((error) => {
            if (error.message === 'Submissions finalized') {
              return 'Submissions finalized';
            }
            return throwError(() => error);
          }),
        ),
      );

      responseData.submissions.forEach((sub) => {
        sub.source_code = this.decode(sub.source_code);
        sub.stdin = sub.stdin ? this.decode(sub.stdin) : sub.stdin;
        sub.stdout = sub.stdout ? this.decode(sub.stdout) : sub.stdout;
        sub.expected_output = this.decode(sub.expected_output);
      });

      return responseData;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        'An unexpected error occurred';
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        { status: statusCode, error: message },
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

  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes: string) {
    return Base64.decode(bytes);
  }
}
