// Define an interface for pagination parameters
export interface Pageable {
  page: number; // The current page number to retrieve
  size: number; // The number of items per page
  timestamp: Date; // A timestamp for filtering entities based on creation date
}
