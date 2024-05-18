import { MockAuthorizationGuard } from './authorization.guard.mock';

export class AuthMock {
  static mockAuthorizationGuard() {
    return MockAuthorizationGuard;
  }
}
