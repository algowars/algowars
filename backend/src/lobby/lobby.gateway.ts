import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyService } from './lobby.service';

@WebSocketGateway()
export class LobbyGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { roomId }: { roomId: string }): void {
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, { roomId }: { roomId: string }): void {
    client.leave(roomId);
  }

  async emitLobbyUpdate(lobbyId: string) {
    const players = await this.lobbyService.getLobbyPlayers(lobbyId);
    this.server.to(lobbyId).emit(
      'playersUpdate',
      players.map((player) => ({
        username: player.username,
      })),
    );
  }
}
