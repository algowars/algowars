import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// The @Injectable() decorator marks this class as a provider that can be injected into other parts of the application.
@Injectable()
export class MockPermissionGuard implements CanActivate {
  // The canActivate method determines whether the current user can access the route.
  // In this mock implementation, it always returns true, allowing access to all routes.

  // The _context parameter is not used in this method, so it is prefixed with an underscore to avoid linter warnings.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(_context: ExecutionContext): boolean {
    return true; // Always allow access
  }
}
