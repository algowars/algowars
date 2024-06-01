import { Sort } from 'typeorm';

export interface Pageable {
  /**
   * The current page number (zero-based).
   */
  page: number;

  /**
   * The number of items per page.
   */
  size: number;

  /**
   * Optional sorting parameters.
   */
  sort?: Sort;
}
