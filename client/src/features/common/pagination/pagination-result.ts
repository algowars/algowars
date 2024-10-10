export interface PaginationResult<T> {
  results: T[];
  page: number;
  size: number;
  totalPages: number;
}
