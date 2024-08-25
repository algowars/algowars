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

// Function to create a guard class that checks for specific route permissions
function createPermissionsGuard(
  requiredRoutePermissions: string[],
): Type<CanActivate> {
  @Injectable()
  class PermissionsGuardImpl implements CanActivate {
    // Convert the callback-based claimCheck function to a promise-based function using promisify
    private permissionCheck = promisify(
      claimCheck((payload) => {
        // Extract the permissions from the JWT payload
        const permissionsJwtClaim = (payload.permissions as string[]) || [];

        // Check if all required route permissions are included in the permissions claim
        const hasRequiredRoutePermissions = requiredRoutePermissions.every(
          (requiredRoutePermission) =>
            permissionsJwtClaim.includes(requiredRoutePermission),
        );

        // If not all required permissions are present, throw an InsufficientScopeError
        if (!hasRequiredRoutePermissions) {
          throw new InsufficientScopeError();
        }

        return hasRequiredRoutePermissions;
      }),
    );

    // Method to determine if the current user can access the route
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();

      try {
        // Check the permissions using the permissionCheck method
        await this.permissionCheck(request, response);

        // If the check passes, allow access
        return true;
      } catch (error) {
        // If an error occurs (e.g., insufficient permissions), throw a ForbiddenException
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  // Return the dynamically created guard class
  return PermissionsGuardImpl;
}

// Export a function that creates a PermissionsGuard with the specified route permissions
export const PermissionsGuard = (
  routePermissions: string[],
): Type<CanActivate> => createPermissionsGuard(routePermissions);
