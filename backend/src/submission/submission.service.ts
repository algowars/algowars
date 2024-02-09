import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubmissionGateway } from './submission.gateway';
import { firstValueFrom } from 'rxjs';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';
import { Base64 } from 'js-base64';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly submissionGateway: SubmissionGateway,
  ) {}

  async checkSubmissionStatus(submissionId: string) {
    const submission: EvaluatorSubmission =
      await this.getSubmission(submissionId);

    this.submissionGateway.updateSubmissionStatus(
      submissionId,
      submission.status,
    );
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
      if (response.data.stderr) {
        response.data.stderr = Base64.decode(response.data.stderr);
      }
      if (response.data.stdout) {
        response.data.stdout = Base64.decode(response.data.stdout);
      }

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
