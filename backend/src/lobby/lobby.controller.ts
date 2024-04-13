import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { Request } from 'express';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { GameService } from 'src/game/game.service';
import { GamePaginationDto } from 'src/game/dtos/game-pagination.dto';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { Account, Player } from 'src/data-model/entities';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { JoinLobbyDto } from './dtos/join-lobby.dto';
import { Lobby } from 'src/data-model/entities/battle/lobby.entity';
import { Throttle, seconds } from '@nestjs/throttler';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { lobbyNotFoundException } from './exceptions/lobby-not-found.exception';
import { LeaveLobbyDto } from './dtos/leave-lobby.dto';
import { LobbyGateway } from './lobby.gateway';

@Controller('v1/lobby')
export class LobbyController {
  constructor(
    private readonly lobbyService: LobbyService,
    private readonly gameService: GameService,
    private readonly lobbyGateway: LobbyGateway,
  ) {}

  @Get()
  findPublicLobbiesPageable(
    @Query() gamePaginationDto: GamePaginationDto,
  ): Promise<PaginationResponse<Game>> {
    return this.gameService.findPublicGamesPageable(gamePaginationDto);
  }

  @Get('players')
  getLobbyPlayers(@Query() { lobbyId }): Promise<Player[]> {
    return this.lobbyService.getLobbyPlayers(lobbyId);
  }

  @Throttle({ default: { limit: seconds(5), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Put('leave')
  async leaveLobby(
    @Query() leaveLobbyDto: LeaveLobbyDto,
    @Req() request: Request,
  ): Promise<Lobby> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    const lobby = await this.getLobby(leaveLobbyDto.lobbyId);

    const updatedLobby = await this.removePlayerFromLobby(
      lobby,
      account.player,
    );

    this.emitLobbyUpdate(lobby.id);

    return updatedLobby;
  }

  @Throttle({ default: { limit: seconds(5), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Put('join')
  async joinLobby(
    @Query() joinLobbyDto: JoinLobbyDto,
    @Req() request: Request,
  ): Promise<Lobby> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    const lobby = await this.getLobby(joinLobbyDto.lobbyId);

    const updatedLobby = await this.addPlayerToLobby(lobby, account.player);

    this.emitLobbyUpdate(lobby.id);

    return updatedLobby;
  }

  private async addPlayerToLobby(lobby: Lobby, player: Player): Promise<Lobby> {
    try {
      await this.lobbyService.addPlayerToLobby(lobby.id, player.id);

      return this.lobbyService.findLobbyById(lobby.id);
    } catch (error: unknown) {
      throw new HttpException('Error joining lobby', HttpStatus.BAD_REQUEST);
    }
  }

  private async removePlayerFromLobby(
    lobby: Lobby,
    player: Player,
  ): Promise<Lobby> {
    try {
      await this.lobbyService.removePlayerFromLobby(lobby.id, player.id);

      return this.lobbyService.findLobbyById(lobby.id);
    } catch (error: unknown) {
      throw new HttpException('Error leaving lobby', HttpStatus.BAD_REQUEST);
    }
  }

  private async getLobby(lobbyId: string): Promise<Lobby> {
    const foundLobby = await this.lobbyService.findLobbyById(lobbyId, [
      'players',
    ]);

    if (!foundLobby) {
      throw new lobbyNotFoundException();
    }

    return foundLobby;
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

  private mapPrivateAccount(request: Request): Account {
    return request.account;
  }

  private emitLobbyUpdate(lobbyId: string) {
    this.lobbyGateway.emitLobbyUpdate(lobbyId);
  }
}
