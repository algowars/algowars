import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities/battle/lobby.entity';
import { Repository } from 'typeorm';
import { LobbyPaginationDto } from './dtos/lobby-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private readonly lobbyRepository: Repository<Lobby>,
  ) {}

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
}
