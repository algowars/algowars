import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubmissionGateway } from './submission.gateway';
import { firstValueFrom } from 'rxjs';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly submissionGateway: SubmissionGateway,
  ) {}

  async checkSubmissionStatus(submissionId: string) {
    console.log(submissionId, 'SUBMISSION ID');
    const submission: EvaluatorSubmission =
      await this.getSubmission(submissionId);

    this.submissionGateway.updateSubmissionStatus(
      submissionId,
      submission.status,
    );
  }

  async getSubmission(submissionId: string): Promise<EvaluatorSubmission> {
    console.log('SUBMISSION ID: ', submissionId);
    const params = {
      base64_encoded: 'true',
      fields: '*',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`/submissions/${submissionId}`, { params }),
      );
      console.log('RESPONSE: ', response);
      if (response.data.stderr) {
        response.data.stderr = atob(response.data.stderr);
      }
      if (response.data.stdout) {
        response.data.stdout = atob(response.data.stdout);
      }

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
}
