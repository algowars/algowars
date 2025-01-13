import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class OpenAccountRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @IsOptional()
  readonly username?: string;
}
