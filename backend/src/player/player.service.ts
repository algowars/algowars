import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/common/query/query-options';
import { Player } from 'src/data-model/entities';
import { Repository } from 'typeorm';

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
}
