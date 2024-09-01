import { ProblemImplementation } from './problem';

describe('Problem', () => {
  describe('should compare id', () => {
    const expectedId = 'id';
    const problem = new ProblemImplementation({
      id: expectedId,
      title: 'test',
      slug: 'test-slug',
      question: 'test',
    });

    expect(problem.compareId(expectedId)).toBeTruthy();
  });
});
