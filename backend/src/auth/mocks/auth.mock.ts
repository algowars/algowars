import { MockAccountOwnerGuard } from './account-owner.guard.mock';
import { MockAuthorizationGuard } from './authorization.guard.mock';
import { MockPermissionGuard } from './premission.guard.mock';

// AuthMock class provides static methods to retrieve mock guard classes
export class AuthMock {
  // Static method to get the MockAuthorizationGuard class
  static mockAuthorizationGuard() {
    return MockAuthorizationGuard;
  }

  // Static method to get the MockAccountOwnerGuard class
  static mockAccountOwnerGuard() {
    return MockAccountOwnerGuard;
  }

  // Static method to get the MockPermissionGuard class
  static mockPermissionGuard() {
    return MockPermissionGuard;
  }
}
