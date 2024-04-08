import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  InvalidTokenError,
  UnauthorizedError,
  auth,
} from 'express-oauth2-jwt-bearer';
import { Socket } from 'socket.io';
import { promisify } from 'util';

@Injectable()
export class WsAuthorizationGuard implements CanActivate {
  private validateAccessToken = promisify(auth());

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    console.log(client);
    const token = this.extractToken(client);

    console.log(token);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const request = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const response = {
      setHeader: () => {},
    };

    return this.validateToken(request, response);
  }

  private extractToken(client: Socket): string | string[] {
    return client.handshake.query.token;
  }

  private async validateToken(request: any, response: any): Promise<boolean> {
    try {
      await this.validateAccessToken(request, response);
      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Invalid token provided.');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(
          'Authorization required, token invalid or missing.',
        );
      }

      throw new InternalServerErrorException(
        'An internal server error occurred.',
      );
    }
  }
}
