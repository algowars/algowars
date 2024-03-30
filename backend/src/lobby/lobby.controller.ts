import { Controller, Get, Query } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { GameService } from 'src/game/game.service';
import { GamePaginationDto } from 'src/game/dtos/game-pagination.dto';
import { Game } from 'src/data-model/entities/battle/game.entity';

@Controller('v1/lobby')
export class LobbyController {
  constructor(
    private readonly lobbyService: LobbyService,
    private readonly gameService: GameService,
  ) {}

  @Get()
  findPublicLobbiesPageable(
    @Query() gamePaginationDto: GamePaginationDto,
  ): Promise<PaginationResponse<Game>> {
    return this.gameService.findPublicGamesPageable(gamePaginationDto);
  }
}
