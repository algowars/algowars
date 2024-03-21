import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';
import { firstValueFrom } from 'rxjs';
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

    console.log(data, params);

    try {
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

  async evaluate(
    createSubmission: CreateEvaluatorSubmission,
  ): Promise<EvaluatorSubmissionResponse> {
    const data = {
      language_id: createSubmission.language_id,
      source_code: this.encode(createSubmission.source_code),
    };

    const params = {
      base64_encoded: 'true',
      fields: '*',
      expected_output: createSubmission.expected_output,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('/submissions', data, { params }),
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
