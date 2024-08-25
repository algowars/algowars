import { ProblemSetupFactory } from './problem-setup.factory';
import { ProblemFactory } from './problem.factory';
import { TestInputFactory } from './test-input.factory';
import { TestFactory } from './test.factory';

export const ProblemFactories = [
  ProblemFactory,
  ProblemSetupFactory,
  TestFactory,
  TestInputFactory,
];
