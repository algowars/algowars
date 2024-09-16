import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Profile } from './dto/response/profile.dto';

@Controller('v1/profile')
export class ProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  getProfile(@Req() request: Request): Promise<Profile> {
    return this.queryBus.execute();
  }
}
