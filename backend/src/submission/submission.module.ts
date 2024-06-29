import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';

@Module({
  controllers: [SubmissionController],
  providers: [],
})
export class SubmissionModule {}
