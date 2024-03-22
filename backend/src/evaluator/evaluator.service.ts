import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';
import {
  catchError,
  delay,
  firstValueFrom,
  map,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';
import { CreateEvaluatorSubmission } from 'src/data-model/model/create-evaluator-submission';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Injectable()
export class EvaluatorService {
  constructor(private readonly httpService: HttpService) {}

  async batchEvaluate(
    createSubmissions: CreateEvaluatorSubmission[],
  ): Promise<EvaluatorSubmissionResponse[]> {
    console.log(createSubmissions);
    const data = {
      submissions: createSubmissions.map((submission) => ({
        language_id: submission.language_id,
        source_code: this.encode(submission.source_code),
        expected_output: this.encode(submission.expected_output),
        stdin: this.encode(submission.stdin),
      })),
    };

    const params = {
      base64_encoded: 'true',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('/submissions/batch', data, { params }),
      );
      console.log('DATA:                           ', response.data);
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

      console.log('FINAL RESPONSE: ', responseData);
      responseData.submissions.forEach((sub) => {
        sub.source_code = this.decode(sub.source_code);
        sub.stdin = this.decode(sub.stdin);
        sub.stdout = this.decode(sub.stdout);
        sub.expected_output = this.decode(sub.expected_output);
      });
      console.log(responseData.submissions, 'AFTER DECODE');
      return responseData;
    } catch (error) {
      console.error(error);
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

  async getSubmission(submissionId: string): Promise<EvaluatorSubmission> {
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

  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes: string) {
    return Base64.decode(bytes);
  }
}
