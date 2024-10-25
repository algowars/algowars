import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CodeExecutionContextFactory } from './code-execution-context-factory';
import { JavaScriptCodeExecutionContext } from './languages/javascript-code-execution-context';
import { Judge0CodeExecutionService } from './judge0-code-execution-service';
import { CqrsModule } from '@nestjs/cqrs';
import { SubmissionModule } from 'src/submission/submission.module';
import { ProblemModule } from 'src/problem/problem.module';
import { LanguageFactory } from 'src/problem/domain/language-factory';
import { ConfigService } from '@nestjs/config';
import { S3Module, S3Service } from 'lib/s3.module';

@Module({
  imports: [CqrsModule, HttpModule, ProblemModule, SubmissionModule, S3Module],
  providers: [
    CodeExecutionContextFactory,
    {
      provide: S3Service,
      useFactory: (configService: ConfigService) =>
        new S3Service(configService),
      inject: [ConfigService],
    },
    {
      provide: Judge0CodeExecutionService,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new Judge0CodeExecutionService(httpService, {
          apiKey: configService.get('EVALUATOR_API_KEY'),
          url: configService.get('EVALUATOR_URL'),
          host: configService.get('EVALUATOR_HOST'),
          headers: {
            'x-rapidapi-key': configService.get('EVALUATOR_API_KEY'),
            'x-rapidapi-host': configService.get('EVALUATOR_HOST'),
            'Content-Type': 'application/json',
          },
        }),
      inject: [HttpService, ConfigService],
    },
    {
      provide: JavaScriptCodeExecutionContext,
      useFactory: (
        judge0CodeExecutionService: Judge0CodeExecutionService,
        s3Service: S3Service,
      ) =>
        new JavaScriptCodeExecutionContext(
          judge0CodeExecutionService,
          s3Service,
        ),
      inject: [Judge0CodeExecutionService, S3Service],
    },
    LanguageFactory,
  ],
  exports: [CodeExecutionContextFactory],
})
export class CodeExecutionModule {}
