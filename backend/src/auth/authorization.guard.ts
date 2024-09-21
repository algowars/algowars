import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

/**
 * AuthorizationGuard is a NestJS guard that implements the CanActivate interface.
 * It is responsible for validating the access token present in incoming HTTP requests.
 * This guard leverages the `express-oauth2-jwt-bearer` library to perform JWT validation.
 *
 * @example
 * ```typescript
 * @UseGuards(AuthorizationGuard)
 * @Controller('protected')
 * export class ProtectedController {
 *   @Get()
 *   getProtectedResource() {
 *     return { message: 'This is a protected resource.' };
 *   }
 * }
 * ```
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  /**
   * Promisified version of the `auth` middleware from `express-oauth2-jwt-bearer`.
   * This allows the middleware to be used with async/await syntax within the guard.
   */
  private readonly validateAccessToken = promisify(auth());

  /**
   * Determines whether the current request is authorized to proceed.
   *
   * This method extracts the HTTP request and response from the execution context,
   * then attempts to validate the access token using the `validateAccessToken` method.
   * If the token is valid, it returns `true`, allowing the request to proceed.
   * If the token is invalid or missing, it throws an appropriate HTTP exception.
   *
   * @param context - The execution context provided by NestJS, containing details about the current request.
   * @returns A promise that resolves to `true` if the request is authorized.
   *
   * @throws {UnauthorizedException} If the token is invalid (`InvalidTokenError`) or missing (`UnauthorizedError`).
   * @throws {InternalServerErrorException} If an unexpected error occurs during token validation.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('CONTEXT: ', context);
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      await this.validateAccessToken(request, response);

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }

      throw new InternalServerErrorException();
    }
  }
}
