import { Sort } from 'typeorm';
import { Pageable } from './pageable';

export interface Page<T> {
  /**
   * The number of total pages.
   */
  getTotalPages(): number;

  /**
   * The total amount of elements.
   */
  getTotalElements(): number;

  /**
   * Returns a new Page with the content of the current one mapped by the given function.
   *
   * @param converter A function that maps the content of the current page to a new type.
   * @returns A new Page with the content mapped to the new type.
   */
  map<U>(converter: (item: T) => U): Page<U>;

  /**
   * The Pageable that's been used to request the current Page.
   */
  getPageable(): Pageable;

  /**
   * Whether the current Page has content.
   */
  hasContent(): boolean;

  /**
   * The content of the Page as a list.
   */
  getContent(): T[];

  /**
   * The number of elements on the current Page.
   */
  getNumberOfElements(): number;

  /**
   * The size of the Page.
   */
  getSize(): number;

  /**
   * The number of the current Page. Is always non-negative.
   */
  getNumber(): number;

  /**
   * The sorting parameters for the Page.
   */
  getSort(): Sort;

  /**
   * Whether the current Page has a previous Page.
   */
  hasPrevious(): boolean;

  /**
   * Whether the current Page is the first one.
   */
  isFirst(): boolean;

  /**
   * Whether the current Page is the last one.
   */
  isLast(): boolean;

  /**
   * Whether there is a next Page.
   */
  hasNext(): boolean;
}
