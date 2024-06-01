export interface Sort {
  /**
   * The property to sort by.
   */
  property: string;

  /**
   * The direction of the sort, either 'ASC' for ascending or 'DESC' for descending.
   */
  direction: 'ASC' | 'DESC';
}
