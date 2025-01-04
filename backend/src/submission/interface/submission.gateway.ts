import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { WsExceptionFilter } from 'src/ws-exception.filter';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  namespace: 'submission',
  cors: {
    origin: '*',
  },
})
export class SubmissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private readonly logger = new Logger('SubmissionGateway');

  async onModuleInit(): Promise<void> {
    this.logger.log('ChatGateway initialized');
  }

  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Client connected: "${socket.id}"`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('subscribeToSubmission')
  async handleSubscribe(socket: Socket, submissionId: string): Promise<void> {
    this.logger.log(`Client subscribed to submission: "${submissionId}"`);
  }

  @SubscribeMessage('submissionUpdate')
  async updateSubmission(): Promise<void> {
    console.log('UPDATE');
  }
}
