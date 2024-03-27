import { Account } from './player/account.entity';
import { Player } from './player/player.entity';
import { ProblemSetup } from './problem/problem-setup.entity';
import { Problem } from './problem/problem.entity';
import { TestInput } from './problem/test-input.entity';
import { Test } from './problem/test.entity';

const entities = [Account, Player, Problem, ProblemSetup, Test, TestInput];

export { Account, Player, Problem, ProblemSetup, Test, TestInput };

export default entities;
