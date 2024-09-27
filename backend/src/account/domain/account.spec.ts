import { Id, IdImplementation } from 'src/common/domain/id';
import { AccountImplementation } from './account';

describe('Account', () => {
  it('should compare id', () => {
    const expectedId = 'id';
    const account = new AccountImplementation({
      id: new IdImplementation(expectedId) as Id,
      sub: 'auth|lk00-089aj8jdf-aj98fja',
      username: 'test_username',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 1,
    });

    expect(account.compareId(new IdImplementation(expectedId))).toBeTruthy();
  });
});