import { Controller } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('v1/lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}
}
