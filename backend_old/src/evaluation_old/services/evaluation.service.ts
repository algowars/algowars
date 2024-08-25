import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJudgeSubmission } from '../dto/judge0/create-judge0-submission.dto';
import { firstValueFrom } from 'rxjs';
import { Judge0Submission } from '../dto/judge0/judge0-submission.dto';

@Injectable()
export class EvaluationService {
  constructor(private readonly httpService: HttpService) { }

  // Creates submissions in batch and returns an array of tokens for the created submissions
  createSubmission(createJudgeSubmission: CreateJudgeSubmission[]): Promise<
    {
      token: string;
    }[]
  > {
    const data = {
      submissions: this.encodeJudgeSubmissions(createJudgeSubmission), // Encode submissions before sending
    };

    try {
      return this.sendBatchSubmission(data); // Sends the encoded submissions
    } catch (error) {
      this.handleError(error); // Handle any errors during submission
    }
  }

  // Retrieves submission results by tokens
  async getSubmissionByTokens(tokens: string[]): Promise<Judge0Submission[]> {
    const params = {
      base64_encode: 'true',   // Ensures the response is base64 encoded
      fields: '*',             // Retrieves all fields
      tokens: tokens.join(','), // Joins tokens into a comma-separated string
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get('/submissions/batch', { params }),
      );

      return response.data.submissions; // Return the array of Judge0Submission
    } catch (error) {
      this.handleError(error); // Handle any errors during retrieval
    }
  }

  // Sends a batch submission request to the Judge0 API
  private async sendBatchSubmission(
    data: {
      submissions: CreateJudgeSubmission[];
    },
    params = {
      base64_encoded: 'true',  // Request that data is base64 encoded
    },
  ): Promise<{ token: string }[]> {
    const response = await firstValueFrom(
      this.httpService.post<{ token: string }[]>('/submissions/batch', data, {
        params,
      }),
    );

    return response.data; // Return the array of tokens
  }

  // Handles errors by throwing a formatted HttpException
  private handleError(error: any) {
    const message =
      error.response?.data?.error || 'An unexpected error occurred'; // Extract error message
    const statusCode =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR; // Extract or default to 500 status code
    throw new HttpException(
      {
        status: statusCode,
        error: message,
      },
      statusCode,
    );
  }

  // Encodes the Judge0 submissions by base64 encoding the string fields
  private encodeJudgeSubmissions(
    judgeSubmission: CreateJudgeSubmission[],
  ): CreateJudgeSubmission[] {
    return judgeSubmission.map((submission) => {
      const encodedSubmission: CreateJudgeSubmission = submission;

      for (const [key, value] of Object.entries(submission)) {
        if (typeof value === 'string') {
          encodedSubmission[key] = this.encode(value); // Encode string fields
        } else {
          encodedSubmission[key] = value; // Keep non-string fields unchanged
        }
      }

      return encodedSubmission;
    });
  }

  // Helper method to base64 encode a string
  private encode(str: string) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  // Helper method to decode a base64 string
  private decode(bytes: string) {
    const escaped = escape(atob(bytes || ''));
    try {
      return decodeURIComponent(escaped); // Attempt to decode the escaped string
    } catch {
      return unescape(escaped); // Fallback to unescape if decodeURIComponent fails
    }
  }
}
