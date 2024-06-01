import { IsNumber, IsString } from 'class-validator';

export class CreateProblemRequest {
  @IsString()
  title: string;
  @IsString()
  question: string;
  @IsString()
  slug: string;
  @IsNumber()
  rating: number;
}
