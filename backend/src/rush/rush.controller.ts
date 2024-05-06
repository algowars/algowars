import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RushService } from './rush.service';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { Account } from 'src/data-model/entities';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { ProblemService } from 'src/problem/problem.service';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { GetRushDto } from './dtos/get-rush.dto';
import { RushNotFoundException } from './exceptions/rush-not-found.exception';

@Controller('v1/rush')
export class RushController {
  constructor(
    private readonly rushService: RushService,
    private readonly problemService: ProblemService,
  ) {}

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Get('find')
  async getRushById(
    @Query()
    getRushDto: GetRushDto,
    @Req()
    request: Request,
  ): Promise<{
    id: string;
    startedAt: Date | null;
  }> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    const foundRush = await this.rushService.findById(getRushDto.rushId, {
      relations: ['player'],
    });

    if (!foundRush) {
      throw new RushNotFoundException();
    }

    if (foundRush?.player?.id !== player.id) {
      throw new HttpException(
        'You are not the user of this game session.',
        HttpStatus.CONFLICT,
      );
    }

    return {
      id: foundRush.id,
      startedAt: new Date(foundRush.startedAt),
    };
  }

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Put('start')
  async startGame(
    @Query()
    getRushDto: GetRushDto,
    @Req()
    request: Request,
  ): Promise<{
    id: string;
    startedAt: Date | null;
  }> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    const rush = await this.rushService.startGame(getRushDto.rushId);

    if (!rush) {
      throw new RushNotFoundException();
    }

    if (rush?.player?.id !== player.id) {
      throw new HttpException(
        'You are not the user of this game session.',
        HttpStatus.CONFLICT,
      );
    }

    return {
      id: rush.id,
      startedAt: rush.startedAt,
    };
  }

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Get('find/status')
  async getRushStatusById(
    @Query()
    getRushDto: GetRushDto,
    @Req()
    request: Request,
  ): Promise<{ id: string; hasGameStarted: boolean }> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    const foundRush = await this.rushService.findById(getRushDto.rushId, {
      relations: ['player'],
    });

    if (!foundRush) {
      throw new RushNotFoundException();
    }

    if (foundRush?.player?.id !== player.id) {
      throw new HttpException(
        'You are not the user of this game session.',
        HttpStatus.CONFLICT,
      );
    }

    return {
      id: foundRush.id,
      hasGameStarted: foundRush.startedAt ? true : false,
    };
  }

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post()
  async createRush(
    @Req()
    request: Request,
  ): Promise<{ id: string }> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    const initialProblemCount = 10;

    const problems =
      await this.problemService.findProblemsByRating(initialProblemCount);

    const rush = await this.rushService.create(problems, player);

    return { id: rush.id };
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
