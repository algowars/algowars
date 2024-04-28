import { IsString, MaxLength } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
  username: string;

  @IsString()
  @MaxLength(200, { message: 'Bio cannot exceed 200 characters' })
  bio: string;

  @IsString()
  @MaxLength(100, { message: 'website URL cannot exceed 100 characters' })
  websiteUrl: string;

  @IsString()
  @MaxLength(100, { message: 'location cannot exceed 100 characters' })
  location: string;
}
