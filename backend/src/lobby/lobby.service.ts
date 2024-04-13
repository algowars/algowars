import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities/battle/lobby.entity';
import { Repository } from 'typeorm';
import { LobbyPaginationDto } from './dtos/lobby-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { Player } from 'src/data-model/entities';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private readonly lobbyRepository: Repository<Lobby>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  findLobbyById(id: string, relations: string[] = []): Promise<Lobby | null> {
    if (!id) {
      return null;
    }

    return this.lobbyRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  findPublicLobbiesPageable(
    lobbyPaginationDto: LobbyPaginationDto,
  ): Promise<PaginationResponse<Lobby>> {
    const entityName = 'lobby';

    const queryBuilder = this.lobbyRepository
      .createQueryBuilder(entityName)
      .leftJoinAndSelect(`${entityName}.game`, 'game');

    return Pagination.paginateWithQueryBuilder(
      queryBuilder,
      lobbyPaginationDto,
    );
  }

  async addPlayerToLobby(lobbyId: string, playerId: string): Promise<void> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    });
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
    });
    if (lobby && player && lobby.players.length < lobby.maxPlayers) {
      lobby.players.push(player);
      await this.lobbyRepository.save(lobby);
    }
  }

  async removePlayerFromLobby(
    lobbyId: string,
    playerId: string,
  ): Promise<void> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    });
    if (lobby) {
      lobby.players = lobby.players.filter((p) => p.id !== playerId);
      await this.lobbyRepository.save(lobby);
    }
  }

  async getLobbyPlayers(lobbyId: string): Promise<Player[]> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    });
    return lobby ? lobby.players : [];
  }
}
