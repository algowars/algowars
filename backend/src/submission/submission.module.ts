import { Module } from '@nestjs/common';
import { SubmissionController } from './interface/submission.controller';

@Module({
  controllers: [SubmissionController],
})
export class SubmissionModule {}
