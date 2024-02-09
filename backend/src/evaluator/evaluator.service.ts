import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';
import { firstValueFrom } from 'rxjs';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Injectable()
export class EvaluatorService {
  constructor(private readonly httpService: HttpService) {}

  async evaluateAnonymous(code: string): Promise<EvaluatorSubmissionResponse> {
    const data = {
      language_id: 93,
      source_code: Base64.encode(code),
      stdin: 'SnVkZ2Uw',
    };

    const params = {
      base64_encoded: 'true',
      fields: '*',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('/submissions', data, { params }),
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
}
