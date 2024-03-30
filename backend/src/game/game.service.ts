import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

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
}
