import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/data-model/entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findByUsername(
    username: string,
    relations: string[] = [],
  ): Promise<Player | null> {
    if (!username) {
      return null;
    }

    return this.playerRepository.findOne({
      where: { username },
      relations,
    });
  }
}
