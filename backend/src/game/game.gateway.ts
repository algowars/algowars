import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { Player } from 'src/data-model/entities';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { gameId }: { gameId: string }): void {
    client.join(gameId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, { gameId }: { gameId: string }): void {
    client.leave(gameId);
  }

  async emitGameUpdate(gameId: string) {
    console.log('GAME ID: ', gameId);

    const game = await this.gameService.findGameById(gameId, [
      'lobby',
      'lobby.players',
    ]);

    console.log({ game });

    this.server.to(gameId).emit('gameUpdate', {
      ...game,
      lobby: {
        ...game.lobby,
        players: game.lobby.players.map(
          (player) =>
            ({
              id: player.id,
              username: player.username,
            }) as Player,
        ),
      },
    });
  }
}
