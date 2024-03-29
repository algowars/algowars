import { HttpException, HttpStatus } from '@nestjs/common';
import { PlayerLabel } from '../labels/player.label';

export class PlayerNotFoundException extends HttpException {
  constructor() {
    super(PlayerLabel.PLAYER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
