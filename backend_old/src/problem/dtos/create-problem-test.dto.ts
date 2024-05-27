import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProblemTestDto {
  @IsString()
  @IsNotEmpty()
  inputs: string;

  @IsString()
  @IsNotEmpty()
  expectedOutput: string;
}
