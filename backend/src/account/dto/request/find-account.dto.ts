import { IsUUID } from 'class-validator';

// FindAccountDto is a Data Transfer Object (DTO) used for finding an account by its ID.
// It includes validation rules to ensure that the ID is a valid UUID.
export class FindAccountDto {
  @IsUUID()
  id!: string; // The 'id' field must be a valid UUID.
}
