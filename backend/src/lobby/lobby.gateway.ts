import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LobbyService } from './lobby.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { WsAuthorizationGuard } from 'src/auth/ws-authorization.guard';

@WebSocketGateway()
@UseGuards(WsAuthorizationGuard)
export class LobbyGateway {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly lobbyService: LobbyService) {}

  // @SubscribeMessage('joinLobby')
  // async handleJoinLobby(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() { lobbyId }: { lobbyId: string },
  // ) {
  //   const { playerId } = client.data.account;

  //   if (!playerId) {
  //     throw new HttpException('Unable to get player', HttpStatus.BAD_GATEWAY);
  //   }

  //   await this.lobbyService.addPlayerToLobby(lobbyId, playerId);
  //   client.join(lobbyId);
  //   this.updateLobby(lobbyId);
  // }

  // @SubscribeMessage('leaveLobby')
  // async handleLeaveLobby(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() { lobbyId, playerId }: { lobbyId: string; playerId: string },
  // ) {
  //   await this.lobbyService.removePlayerFromLobby(lobbyId, playerId);
  //   client.leave(lobbyId);
  //   this.updateLobby(lobbyId);
  // }

  // private async updateLobby(lobbyId: string) {
  //   const players = await this.lobbyService.getLobbyPlayers(lobbyId);
  //   this.server.to(lobbyId).emit(
  //     'playersUpdate',
  //     players.map((player) => ({
  //       username: player.username,
  //     })),
  //   );
  // }
}
