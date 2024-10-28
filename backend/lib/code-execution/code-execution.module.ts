import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Service } from 'lib/s3.module';
import { JavaScriptJudge0CodeExecutionContext } from './languages/javascript/judge0/javascript-judge0-code-execution-context';
import { CodeExecutionContextFactory } from './code-execution-context-factory';
import {
  Judge0CodeExecutionService,
  Judge0ExecutionConfig,
} from './judge0/judge0-code-execution-service';

const codeExecutionContextProviders: Provider[] = [
  {
    provide: JavaScriptJudge0CodeExecutionContext,
    useFactory: (
      judge0CodeExecutionService: Judge0CodeExecutionService,
      s3Service: S3Service,
    ) =>
      new JavaScriptJudge0CodeExecutionContext(
        judge0CodeExecutionService,
        s3Service,
      ),
    inject: [Judge0CodeExecutionService, S3Service],
  },
  CodeExecutionContextFactory,
];

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: Judge0CodeExecutionService,
      useFactory: (httpService: HttpService, configService: ConfigService) => {
        const judge0Config: Judge0ExecutionConfig = {
          apiKey: configService.get<string>('EVALUATOR_API_KEY'),
          url: configService.get<string>('EVALUATOR_URL'),
          host: configService.get<string>('JUDGE0_HOST'),
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': configService.get<string>('EVALUATOR_HOST'),
            'x-rapidapi-key': configService.get<string>('EVALUATOR_API_KEY'),
          },
        };
        return new Judge0CodeExecutionService(httpService, judge0Config);
      },
      inject: [HttpService, ConfigService],
    },
    {
      provide: S3Service,
      useFactory: (configService: ConfigService) =>
        new S3Service(configService),
      inject: [ConfigService],
    },
    ...codeExecutionContextProviders,
  ],
  exports: [...codeExecutionContextProviders],
})
export class CodeExecutionModule {}
