import { Controller, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('/v1/lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  async createLobby(): Promise<void> {}
}
