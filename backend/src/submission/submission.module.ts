import { Logger, Module, Provider } from '@nestjs/common';
import { SubmissionController } from './interface/submission.controller';
import { SubmissionCommandHandlers } from './application/commands';
import { SubmissionFactory } from './domain/submission-factory';
import { CqrsModule } from '@nestjs/cqrs';

const infrastructure: Provider[] = [];

const application = [...SubmissionCommandHandlers];

const domain = [SubmissionFactory];

@Module({
  imports: [CqrsModule],
  controllers: [SubmissionController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class SubmissionModule {}
