import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindGameDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsOptional()
  @IsBoolean()
  sessions?: boolean;
}
