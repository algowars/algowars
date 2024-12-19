import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateSubmissionRequest } from './dto/request/create-submission-request.dto';
import { Request } from 'express';
import { CreateSubmissionCommand } from '../application/commands/create-submission/create-submission.command';
import { Id } from 'src/common/domain/id';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';

@Controller('v1/submission')
export class SubmissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  @Post()
  async createSubmission(
    @Body() body: CreateSubmissionRequest,
    @Req() request: Request,
  ): Promise<string> {
    const account = request?.account;

    const id = await this.commandBus.execute<CreateSubmissionCommand, Id>(
      new CreateSubmissionCommand(account, body),
    );

    return id.toString();
  }
}
