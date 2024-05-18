import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockPermissionGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}
