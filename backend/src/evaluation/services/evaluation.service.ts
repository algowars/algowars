import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJudgeSubmission } from '../dto/judge0/create-judge0-submission.dto';
import { firstValueFrom } from 'rxjs';
import { Judge0Submission } from '../dto/judge0/judge0-submission.dto';

@Injectable()
export class EvaluationService {
  constructor(private readonly httpService: HttpService) {}

  createSubmission(createJudgeSubmission: CreateJudgeSubmission[]): Promise<
    {
      token: string;
    }[]
  > {
    const data = {
      submissions: this.encodeJudgeSubmissions(createJudgeSubmission),
    };

    try {
      return this.sendBatchSubmission(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getSubmissionByTokens(tokens: string[]): Promise<Judge0Submission[]> {
    const params = {
      base64_encode: 'true',
      fields: '*',
      tokens: tokens.join(','),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get('/submissions/batch', { params }),
      );

      console.log('RESPONSE: ', response.data.submissions);
      return response.data.submissions;
    } catch (error) {
      this.handleError(error);
    }
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

  private encodeJudgeSubmissions(
    judgeSubmission: CreateJudgeSubmission[],
  ): CreateJudgeSubmission[] {
    return judgeSubmission.map((submission) => {
      const encodedSubmission: CreateJudgeSubmission = submission;

      for (const [key, value] of Object.entries(submission)) {
        if (typeof value === 'string') {
          encodedSubmission[key] = this.encode(value);
        } else {
          encodedSubmission[key] = value;
        }
      }

      return encodedSubmission;
    });
  }

  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes: string) {
    const escaped = escape(atob(bytes || ''));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  }
}
