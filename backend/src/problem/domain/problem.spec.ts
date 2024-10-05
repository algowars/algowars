import { IdImplementation } from 'src/common/domain/id';
import { ProblemImplementation } from './problem';

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
    });

    expect(problem.compareId(expectedId)).toBeTruthy();
  });
});
