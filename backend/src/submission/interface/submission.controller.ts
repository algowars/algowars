import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateSubmissionRequest } from './dto/request/create-submission-request.dto';
import { Request } from 'express';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { CreateSubmissionCommand } from '../application/commands/create-submission/create-submission.command';
import { Id } from 'src/common/domain/id';
import { GetSubmissionsByUsernameParam } from './dto/request/get-submissions-by-username.dto';
import { FindUserSubmissionsByUsernameQuery } from '../application/queries/find-user-submissions-by-username/find-user-submissions-by-username.query';
import { UsernameImplementation } from 'src/account/domain/username';

@Controller('v1/submission')
export class SubmissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get('username/:username')
  async getUserSubmissions(
    @Param() param: GetSubmissionsByUsernameParam,
  ): Promise<void> {
    return this.queryBus.execute(
      new FindUserSubmissionsByUsernameQuery(
        new UsernameImplementation(param.username),
      ),
    );
  }
}
