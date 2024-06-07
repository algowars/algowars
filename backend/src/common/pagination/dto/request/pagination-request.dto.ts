import { IsDate, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { PaginationLabel } from '../../label/pagination.label';
import { Pageable } from '../pageable';

export class PaginationRequest implements Pageable {
  @IsInt({ message: PaginationLabel.PAGE_MUST_BE_INT })
  @Min(1, { message: PaginationLabel.PAGE_MUST_MEET_MINIMUM })
  page: number;

  @IsInt({ message: PaginationLabel.SIZE_MUST_BE_INT })
  @Min(5, { message: PaginationLabel.SIZE_MUST_MEET_MINIMUM })
  @Max(100, { message: PaginationLabel.SIZE_MUST_MEET_MAXIMUM })
  size: number;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;
}
