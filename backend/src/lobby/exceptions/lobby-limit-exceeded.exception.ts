import { HttpException, HttpStatus } from '@nestjs/common';
import { LobbyLabel } from '../labels/lobby.label';

export class LobbyLimitExceededException extends HttpException {
  constructor() {
    super(LobbyLabel.LOBBY_MAX_PLAYER_EXCEEDED, HttpStatus.CONFLICT);
  }
}
