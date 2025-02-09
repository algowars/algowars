import { IsBoolean, IsOptional } from 'class-validator';

export class FindRushByIdQueryDto {
  @IsOptional()
  @IsBoolean()
  readonly start?: boolean;
}
