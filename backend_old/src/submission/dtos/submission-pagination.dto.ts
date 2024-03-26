import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';

export class SubmissionPaginationDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
