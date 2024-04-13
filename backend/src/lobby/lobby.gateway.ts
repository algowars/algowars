import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LobbyService } from './lobby.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthorizationGuard } from 'src/auth/ws-authorization.guard';

@WebSocketGateway()
@UseGuards(WsAuthorizationGuard)
export class LobbyGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  async updateLobby(lobbyId: string) {
    console.log('LOBBY ID: ', lobbyId);
    const players = await this.lobbyService.getLobbyPlayers(lobbyId);
    this.server.to(lobbyId).emit(
      'playersUpdate',
      players.map((player) => ({
        username: player.username,
      })),
    );
  }
}
