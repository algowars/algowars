import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Injectable()
export class EvaluatorService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async evaluateAnonymous(code: string): Promise<EvaluatorSubmissionResponse> {
    console.log(code, Buffer.from(code).toString('base64'));
    const data = {
      language_id: 93,
      source_code: Buffer.from(code).toString('base64'),
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
    console.log(submissionId);
    const params = {
      base64_encoded: 'true',
      fields: 'stdout,stderr,status_id,langauge_id',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `/submissions/${encodeURIComponent(submissionId)}`,
          { params },
        ),
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
