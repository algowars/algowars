import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/common/query/query-options';
import { Player } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  findById(
    id: string,
    { relations = [], select = {} }: QueryOptions = {},
  ): Promise<Player> {
    if (!id) {
      return null;
    }

    return this.playerRepository.findOne({
      where: {
        id,
      },
      select,
      relations,
    });
  }

  updatePlayer(
    updatePlayerDto: UpdatePlayerDto,
    player: Player,
  ): Promise<Player> {
    if (player) {
      this.updateUsername(updatePlayerDto.username, player);
      player.bio = updatePlayerDto.bio;
      player.websiteUrl = updatePlayerDto.websiteUrl;
      player.location = updatePlayerDto.location;

      return this.playerRepository.save(player);
    }

    throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
  }

  private updateUsername(newUsername: string, player: Player) {
    if (player.username !== newUsername) {
      try {
        player.updateUsername(newUsername);
      } catch (err: any) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
