import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountRequest {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  username: string;
}
