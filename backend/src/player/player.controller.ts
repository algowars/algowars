import { Controller } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
}
