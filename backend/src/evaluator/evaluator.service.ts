import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';
import * as JSZip from 'jszip';
import { firstValueFrom } from 'rxjs';
import { promises as fs } from 'fs';
import { EvaluatorSubmission } from 'src/data-model/model/evaluator-submission';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';
import { resolve } from 'path';

@Injectable()
export class EvaluatorService {
  constructor(private readonly httpService: HttpService) {}

  async evaluateAnonymous(
    code: string,
    files: {
      fileName: string;
      file: string;
    }[],
  ): Promise<EvaluatorSubmissionResponse> {
    const zip = new JSZip();
    const chaiFilePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      'chai',
      'chai.js',
    );
    const chaiFile = await fs.readFile(chaiFilePath, 'utf8');
    console.log(chaiFile);
    zip.file('chai.js', chaiFile);
    zip.file(
      'greeter.js',
      `module.exports = {
      greeting: function() {
          return "hello, world";
      }
  };`,
    );
    zip.file(
      'adder.js',
      `module.exports = {
      add: function(a, b) {
          return a + b;
      }
  };`,
    );

    const zipContent = await zip.generateAsync({ type: 'base64' });
    const jsId = 93;

    const data = {
      language_id: '93',
      source_code: Base64.encode(`
      const greeter = require('./greeter');
      const adder = require('./adder');
      const chai = require('./chai');
      
      console.log(chai.expect(3).to.equal(2));
      console.log(greeter.greeting());
      console.log(adder.add(10, 20));
`),
      stdin: Base64.encode('2,1,3'),
      additional_files: zipContent,
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

  private encode(str) {
    return btoa(unescape(encodeURIComponent(str || '')));
  }

  private decode(bytes) {
    const escaped = escape(atob(bytes || ''));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
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
