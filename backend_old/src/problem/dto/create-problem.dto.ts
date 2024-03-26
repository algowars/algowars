import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ProblemLabel } from '../labels/problem.label';
import { Test } from 'src/data-model/entities';

export class CreateProblemDto {
  @IsString({ message: ProblemLabel.PROBLEM_TITLE_IS_STRING })
  @MaxLength(100, { message: ProblemLabel.PROBLEM_TITLE_MAX_LENGTH })
  title: string;

  @IsString({ message: ProblemLabel.PROBLEM_QUESTION_IS_STRING })
  @MaxLength(750, { message: ProblemLabel.PROBLEM_QUESTION_MAX_LENGTH })
  question: string;

  @IsString({ message: ProblemLabel.PROBLEM_SLUG_IS_STRING })
  @MaxLength(110, { message: ProblemLabel.PROBLEM_SLUG_MAX_LENGTH })
  slug: string;

  @IsNumber()
  createdById: number;

  tests: Test[];

  @IsString()
  solution: string;
}
