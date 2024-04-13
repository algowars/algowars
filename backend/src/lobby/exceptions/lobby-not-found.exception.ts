import { HttpException, HttpStatus } from '@nestjs/common';
import { LobbyLabel } from '../labels/lobby.label';

export class lobbyNotFoundException extends HttpException {
  constructor() {
    super(LobbyLabel.LOBBY_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
