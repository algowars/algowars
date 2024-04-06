import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LobbyService } from './lobby.service';

@WebSocketGateway()
export class LobbyGateway {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage('joinLobby')
  async handleJoinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, playerId }: { lobbyId: string; playerId: string },
  ) {
    await this.lobbyService.addPlayerToLobby(lobbyId, playerId);
    client.join(lobbyId);
    this.updateLobby(lobbyId);
  }

  @SubscribeMessage('leaveLobby')
  async handleLeaveLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, playerId }: { lobbyId: string; playerId: string },
  ) {
    await this.lobbyService.removePlayerFromLobby(lobbyId, playerId);
    client.leave(lobbyId);
    this.updateLobby(lobbyId);
  }

  private async updateLobby(lobbyId: string) {
    const players = await this.lobbyService.getLobbyPlayers(lobbyId);
    this.server.to(lobbyId).emit(
      'playersUpdate',
      players.map((player) => ({
        username: player.username,
        isGuest: player.isGuest,
      })),
    );
  }
}
