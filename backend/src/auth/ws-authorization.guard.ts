import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth, claimCheck } from 'express-oauth2-jwt-bearer';
import { Socket } from 'socket.io';
import { promisify } from 'util';

@Injectable()
export class WsAuthorizationGuard implements CanActivate {
  private validateAccessToken = promisify(auth());

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    return claimCheck();
  }
}
