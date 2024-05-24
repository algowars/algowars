import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubmissionParams } from './dtos/create-submission-params';
import { firstValueFrom } from 'rxjs';
import { CodeEvaluation } from 'src/evaluator/code-evaluation';
import { CreateJudgeSubmission } from 'src/data-model/models/create-judge-submission';
import { JudgeSubmission } from 'src/data-model/models/judge-submission';
import { Base64 } from 'js-base64';

@Injectable()
export class EvaluationService {
  constructor(private readonly httpService: HttpService) {}

  createSubmission(
    createSubmissionParams: CreateSubmissionParams,
  ): Promise<{ token: string }[]> {
    const data = this.mapEvaluation(createSubmissionParams);

    try {
      return this.sendBatchSubmission(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  private mapEvaluation(createSubmissionParams: CreateSubmissionParams): {
    submissions: CreateJudgeSubmission[];
  } {
    return {
      submissions: createSubmissionParams.tests.map((test) => ({
        language_id: createSubmissionParams.languageId,
        source_code: CodeEvaluation.buildWithSetup(
          createSubmissionParams._sourceCode,
          createSubmissionParams.problemSetup.testSetup,
        ),
        expected_output: this.encode(test.expectedOutput),
        stdin: this.encode(test.inputs.map((input) => input.input).join(',')),
      })),
    };
  }

  private async sendBatchSubmission(
    data: {
      submissions: CreateJudgeSubmission[];
    },
    params = {
      base64_encoded: 'true',
    },
  ): Promise<{ token: string }[]> {
    const response = await firstValueFrom(
      this.httpService.post<{ token: string }[]>('/submissions/batch', data, {
        params,
      }),
    );

    return response.data;
  }

  public async getSubmissionByTokens(
    tokens: string[],
  ): Promise<JudgeSubmission[]> {
    const params = {
      base64_encode: 'true',
      fields: '*',
      tokens: tokens.join(','),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get('/submissions/batch', { params }),
      );
      return response.data.submissions;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
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

  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes: string) {
    return Base64.decode(bytes);
  }
}
