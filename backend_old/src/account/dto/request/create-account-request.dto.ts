import { IsString, MaxLength, MinLength } from 'class-validator';

// CreateAccountRequest is a Data Transfer Object (DTO) used for creating a new account.
// It includes validation rules to ensure that the username meets specified criteria.
export class CreateAccountRequest {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  username: string; // The 'username' field must be a string with a length between 1 and 50 characters.
}
