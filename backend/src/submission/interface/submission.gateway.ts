import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
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
import { SubmissionStatus } from '../domain/submission-status';
import { FindSubmissionByIdQuery } from '../application/queries/find-submission-by-id/find-submission-by-id.query';
import { Submission } from '../domain/submission';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  namespace: 'submission',
  cors: {
    origin: ['https://algowars.netlify.app'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class SubmissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private readonly logger = new Logger('SubmissionGateway');

  constructor(private readonly queryBus: QueryBus) {}

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

    const pollSubmission = async () => {
      try {
        const submission: Submission = await this.queryBus.execute(
          new FindSubmissionByIdQuery(submissionId),
        );

        if (!submission) {
          socket.emit('submissionUpdate', {
            status: 'Error',
            message: `Submission with ID ${submissionId} not found.`,
          });
          return;
        }

        const aggregateStatus = submission.getAggregateStatus();

        const stdouts = submission
          .getResults()
          .map((result) => result.getStdout())
          .filter((stdout) => stdout !== null); // Filter out null values

        socket.emit('submissionUpdate', {
          status: aggregateStatus,
          stdout: stdouts,
        });

        // Check if polling should stop
        if (
          [
            SubmissionStatus.ACCEPTED,
            SubmissionStatus.WRONG_ANSWER,
            SubmissionStatus.COMPILATION_ERROR,
            SubmissionStatus.INTERNAL_ERROR,
            SubmissionStatus.RUNTIME_ERROR,
          ].includes(aggregateStatus)
        ) {
          this.logger.log(`Polling stopped for submission: ${submissionId}`);
          return;
        }

        setTimeout(pollSubmission, 2000); // Poll every 2 seconds
      } catch (error) {
        this.logger.error(
          `Error while polling submission ${submissionId}: ${error.message}`,
        );
        socket.emit('submissionUpdate', {
          status: 'Error',
          message: 'An error occurred while fetching submission status.',
        });
      }
    };

    pollSubmission();
  }

  @SubscribeMessage('submissionUpdate')
  async updateSubmission(): Promise<void> {
    console.log('UPDATE');
  }
}
