import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN_URL, // Use the environment variable
    credentials: true,
  },
})
export class SubmissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}, ${args}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async notifyStatusUpdate(token: string, status: string): Promise<void> {
    this.server.emit(token, { status });
  }

  updateSubmissionStatus(submissionId: string, status: any) {
    this.server.emit('submissionStatus', { submissionId, status });
  }
}
