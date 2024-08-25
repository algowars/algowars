import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindProblemSlugDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsNumber()
  languageId: number;
}
