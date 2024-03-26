import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SubmissionService } from './submission.service';
import { EvaluatorService } from 'src/evaluator/evaluator.service';
import { SubmissionNotFoundException } from './exceptions/submission-not-found.exception';
import { TokensNotFoundException } from './exceptions/tokens-not-found.exception';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN_URL,
    credentials: true,
  },
})
export class SubmissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly evaluatorService: EvaluatorService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}, ${args}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('startSubmissionPolling')
  async handleStartPolling(client: any, payload: { submissionId: number }) {
    console.log('STARTING SUBMISSION POLLING');
    const submission = await this.submissionService.findById(
      payload.submissionId,
      ['tokens'],
    );

    if (!submission) {
      throw new SubmissionNotFoundException();
    }

    if (!submission.tokens) {
      throw new TokensNotFoundException();
    }

    console.log(submission);

    try {
      const response = await this.evaluatorService.pollSubmission(
        submission.tokens.map((token) => token.token),
      );
      this.server.to(client.id).emit('submission-details', response);
    } catch (error) {
      this.server.to(client.id).emit('pollingError', error.message);
    }
  }
}
