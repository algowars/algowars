import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CodeExecutionContextFactory } from './code-execution-context-factory';
import { JavaScriptCodeExecutionContext } from './languages/javascript-code-execution-context';
import { Judge0CodeExecutionService } from './judge0-code-execution-service';
import { CqrsModule } from '@nestjs/cqrs';
import { SubmissionModule } from 'src/submission/submission.module';
import { ProblemModule } from 'src/problem/problem.module';
import { LanguageFactory } from 'src/problem/domain/language-factory';

@Module({
  imports: [CqrsModule, HttpModule, ProblemModule, SubmissionModule],
  providers: [
    CodeExecutionContextFactory,
    JavaScriptCodeExecutionContext,
    Judge0CodeExecutionService,
    LanguageFactory,
  ],
  exports: [CodeExecutionContextFactory],
})
export class CodeExecutionModule {}
