import { Problem } from 'src/problem/domain/problem';
import { Submission } from 'src/submission/domain/submission';

export class FindProblemSolutionsResponse {
  readonly problem: Problem;
  readonly solutions: Submission[];
}
