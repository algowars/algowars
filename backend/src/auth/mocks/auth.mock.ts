import { MockAccountOwnerGuard } from './account-owner.guard.mock';
import { MockAuthorizationGuard } from './authorization.guard.mock';
import { MockPermissionGuard } from './premission.guard.mock';

export class AuthMock {
  static mockAuthorizationGuard() {
    return MockAuthorizationGuard;
  }

  static mockAccountOwnerGuard() {
    return MockAccountOwnerGuard;
  }

  static mockPermissionGuard() {
    return MockPermissionGuard;
  }
}
