import { Module } from '@nestjs/common';
import { SubmissionResultController } from './submission-result.controller';

@Module({
  controllers: [SubmissionResultController],
  providers: [],
})
export class SubmissionResultModule {}
