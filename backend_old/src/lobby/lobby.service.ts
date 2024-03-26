import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities';

import { Repository } from 'typeorm';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private readonly lobbyRepository: Repository<Lobby>,
  ) {}
}
