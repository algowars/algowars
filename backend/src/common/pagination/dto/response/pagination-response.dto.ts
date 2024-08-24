// Define a generic interface for pagination response
export interface PaginationResponse<T> {
  results: T[]; // Array of results of type T (the paginated entities)
  page: number; // Current page number
  size: number; // Number of items per page
  totalPages: number; // Total number of pages based on the total count of entities
}
