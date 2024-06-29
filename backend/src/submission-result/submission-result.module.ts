import { Module } from '@nestjs/common';
import { SubmissionResultController } from './submission-result.controller';
import { SubmissionResultFactories } from './factories';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionResult } from './entities/submission-result.entity';
import { SubmissionResultTestcase } from './entities/submission-result-testcase.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SubmissionResult, SubmissionResultTestcase]),
  ],
  controllers: [SubmissionResultController],
  providers: [...SubmissionResultFactories],
})
export class SubmissionResultModule {}
