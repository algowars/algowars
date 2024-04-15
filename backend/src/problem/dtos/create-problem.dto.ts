import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ProblemLabel } from '../labels/problem.label';
import { ProblemSetup } from 'src/data-model/entities';
import { CreateProblemTestDto } from './create-problem-test.dto';

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

  tests: CreateProblemTestDto[];

  @IsString()
  @IsNotEmpty()
  testSetup: string;

  @IsString()
  @IsNotEmpty()
  initialCode: string;

  @IsString()
  @IsNotEmpty()
  solution: string;

  @IsNumber()
  languageId: number;
}
