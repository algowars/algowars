import { MockAuthorizationGuard } from './authorization.guard.mock';

export class AuthMock {
  static mockAuthGuard() {
    return new MockAuthorizationGuard();
  }
}
