import { IdImplementation } from 'src/common/domain/id';
import { ProblemImplementation } from './problem';
import { AccountImplementation } from 'src/account/domain/account';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';

describe('Problem', () => {
  it('should compare id', () => {
    const expectedId = new IdImplementation('id');
    const problem = new ProblemImplementation({
      id: expectedId,
      title: 'test',
      slug: 'test-slug',
      question: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 1,
      createdBy: new AccountImplementation({
        id: new IdImplementation('test-id'),
        sub: new UserSubImplementation('github|1231-12312-123123-123'),
        username: new UsernameImplementation('USERNAME'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 1,
      }),
    });

    expect(problem.compareId(expectedId)).toBeTruthy();
  });
});
