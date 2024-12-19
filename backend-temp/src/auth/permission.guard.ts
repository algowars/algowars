import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

/**
 * Creates a dynamic PermissionsGuard class tailored to the specified route permissions.
 *
 * This factory function generates a NestJS guard that verifies whether the incoming
 * HTTP request contains a JWT with the necessary permissions. It leverages the
 * `express-oauth2-jwt-bearer` library's `claimCheck` middleware to perform the validation.
 *
 * @param requiredRoutePermissions - An array of permission strings required to access the route.
 * @returns A dynamically created class that implements the CanActivate interface.
 *
 * @example
 * ```typescript
 * @UseGuards(PermissionsGuard(['read:protected', 'write:protected']))
 * @Controller('protected')
 * export class ProtectedController {
 *   @Get()
 *   getProtectedResource() {
 *     return { message: 'You have access to this protected resource.' };
 *   }
 * }
 * ```
 */
function createPermissionsGuard(
  requiredRoutePermissions: string[],
): Type<CanActivate> {
  /**
   * PermissionsGuardImpl is a dynamically created NestJS guard that checks for specific permissions
   * in the JWT payload of incoming HTTP requests. It ensures that the user has all the
   * required permissions to access the protected route.
   */
  @Injectable()
  class PermissionsGuardImpl implements CanActivate {
    /**
     * Promisified version of the `claimCheck` middleware from `express-oauth2-jwt-bearer`.
     * This middleware verifies that the JWT contains all required permissions.
     */
    private permissionCheck = promisify(
      claimCheck((payload) => {
        const permissionsJwtClaim = (payload.permissions as string[]) || [];

        const hasRequiredRoutePermissions = requiredRoutePermissions.every(
          (requiredRoutePermission) =>
            permissionsJwtClaim.includes(requiredRoutePermission),
        );

        if (!hasRequiredRoutePermissions) {
          throw new InsufficientScopeError();
        }

        return hasRequiredRoutePermissions;
      }),
    );

    /**
     * Determines whether the current request has the necessary permissions to proceed.
     *
     * This method extracts the HTTP request and response from the execution context,
     * then attempts to validate the permissions using the `permissionCheck` method.
     * If the permissions are sufficient, it returns `true`, allowing the request to proceed.
     * If the permissions are insufficient or an error occurs, it throws a ForbiddenException.
     *
     * @param context - The execution context provided by NestJS, containing details about the current request.
     * @returns A promise that resolves to `true` if the request has the required permissions.
     *
     * @throws {ForbiddenException} If the permissions are insufficient or an error occurs during validation.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();

      try {
        await this.permissionCheck(request, response);

        return true;
      } catch (error) {
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  return PermissionsGuardImpl;
}

export const PermissionsGuard = (
  routePermissions: string[],
): Type<CanActivate> => createPermissionsGuard(routePermissions);
