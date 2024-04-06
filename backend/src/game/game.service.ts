import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Player } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GamePaginationDto } from './dtos/game-pagination.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  findGameById(id: string, relations: string[] = []) {
    if (!id) {
      return null;
    }

    return this.gameRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  createGame(player: Player, lobbyName?: string) {
    return this.gameRepository.save({
      lobby: {
        name: lobbyName || player.username,
        maxPlayers: 10,
      },
      createdBy: player,
      duration: 5,
    });
  }

  findPublicGamesPageable(
    gamePaginationDto: GamePaginationDto,
  ): Promise<PaginationResponse<Game>> {
    const entityName = 'game';

    let queryBuilder = this.gameRepository
      .createQueryBuilder(entityName)
      .leftJoinAndSelect(`${entityName}.lobby`, 'lobby')
      .leftJoinAndSelect(`${entityName}.status`, 'status');

    queryBuilder = this.filterQueryByActiveGames(queryBuilder, entityName);

    return Pagination.paginateWithQueryBuilder(queryBuilder, gamePaginationDto);
  }

  private filterQueryByActiveGames(
    queryBuilder: SelectQueryBuilder<Game>,
    entityName: string,
  ): SelectQueryBuilder<Game> {
    const twoHoursAgo = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);

    return queryBuilder.andWhere(`${entityName}.updatedAt > :twoHoursAgo`, {
      twoHoursAgo,
    });
  }
}
