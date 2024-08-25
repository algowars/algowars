import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  InvalidTokenError,
  UnauthorizedError,
  auth,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

// The @Injectable() decorator marks this class as a provider that can be injected into other parts of the application.
@Injectable()
export class WsAuthorizationGuard implements CanActivate {
  // Convert the callback-based auth() method to a promise-based method using promisify.
  private validateAccessToken = promisify(auth());

  // The canActivate method determines whether the current user can access the route.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request and response objects from the execution context.
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      // Validate the access token using the validateAccessToken method.
      await this.validateAccessToken(request, response);

      // If validation is successful, allow access.
      return true;
    } catch (error) {
      // Handle specific authentication errors.
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }

      // For any other errors, throw an InternalServerErrorException.
      throw new InternalServerErrorException();
    }
  }
}
