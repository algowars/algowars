import { IsDate, IsInt, IsNotEmpty, Max, Min } from 'class-validator'; // Import validation decorators from class-validator
import { PaginationLabel } from '../../label/pagination.label'; // Import labels for pagination validation messages
import { Pageable } from '../pageable'; // Import the Pageable interface

// Define a class for pagination request that implements the Pageable interface
export class PaginationRequest implements Pageable {
  // Validate that 'page' is an integer and meets minimum requirements
  @IsInt({ message: PaginationLabel.PAGE_MUST_BE_INT }) // Validate that 'page' is an integer
  @Min(1, { message: PaginationLabel.PAGE_MUST_MEET_MINIMUM }) // Validate that 'page' is at least 1
  page: number; // Current page number

  // Validate that 'size' is an integer and meets size constraints
  @IsInt({ message: PaginationLabel.SIZE_MUST_BE_INT }) // Validate that 'size' is an integer
  @Min(5, { message: PaginationLabel.SIZE_MUST_MEET_MINIMUM }) // Validate that 'size' is at least 5
  @Max(100, { message: PaginationLabel.SIZE_MUST_MEET_MAXIMUM }) // Validate that 'size' does not exceed 100
  size: number; // Number of items per page

  // Validate that 'timestamp' is a non-empty date
  @IsNotEmpty() // Ensure 'timestamp' is not empty
  @IsDate() // Validate that 'timestamp' is a Date object
  timestamp: Date; // The date for filtering entities
}
