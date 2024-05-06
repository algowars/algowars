import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/common/query/query-options';
import { Player, Problem, Rush } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RushService {
  constructor(
    @InjectRepository(Rush)
    private readonly rushRepository: Repository<Rush>,
  ) {}

  async startGame(id: string): Promise<Rush | null> {
    if (!id) {
      return null;
    }

    const foundRush = await this.rushRepository.findOne({
      where: {
        id,
      },
      relations: ['player'],
    });

    const offsetSeconds = 10;

    foundRush.startGame(offsetSeconds);

    return this.rushRepository.save(foundRush);
  }

  findById(
    id: string,
    { relations, select }: QueryOptions = {},
  ): Promise<Rush | null> {
    if (!id) {
      return null;
    }

    return this.rushRepository.findOne({
      where: {
        id,
      },
      relations,
      select,
    });
  }

  create(problems: Problem[], player: Player): Promise<Rush> {
    const rush = new Rush();
    rush.setProblems(problems);
    rush.player = player;

    return this.rushRepository.save(rush);
  }
}
