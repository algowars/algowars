import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Request } from 'express';
import { Account } from 'src/data-model/entities';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { ProfileInfo } from 'src/data-model/models/account/profile-info.model';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { UpdatePlayerDto } from 'src/player/dto/update-player.dto';
import { PlayerService } from 'src/player/player.service';

@Controller('v1/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly playerService: PlayerService,
  ) {}

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Get('find/sub')
  findAccountBySub(@Req() request: Request): Promise<Account> {
    const userSub = request.auth.payload.sub;

    return this.accountService.findBySub(userSub);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Req() request: Request,
  ): Promise<Account> {
    const userSub = request.auth.payload.sub;

    return this.accountService.create(createAccountDto, userSub);
  }

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Get('profile/info')
  async getProfileInfo(@Req() request: Request): Promise<ProfileInfo> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    if (!player) {
      throw new PlayerNotFoundException();
    }

    return {
      username: player.username,
      bio: player.bio ?? '',
      websiteUrl: player.websiteUrl ?? '',
      location: player.location ?? '',
    };
  }

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Put('profile/info')
  async updateProfileInfo(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Req() request: Request,
  ): Promise<ProfileInfo> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    if (!player) {
      throw new PlayerNotFoundException();
    }

    const updatedPlayer = await this.playerService.updatePlayer(
      updatePlayerDto,
      player,
    );

    return {
      username: updatedPlayer.username,
      bio: updatedPlayer.bio ?? '',
      websiteUrl: updatedPlayer.websiteUrl ?? '',
      location: updatedPlayer.location ?? '',
    };
  }

  private mapPrivateAccount(request: Request): Account {
    return request.account;
  }

  private validatePrivateAccount(request: Request): void {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account.player) {
      throw new PlayerNotFoundException();
    }
  }
}
