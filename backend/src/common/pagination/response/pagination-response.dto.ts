import { Sort } from 'typeorm';
import { Page } from '../page';
import { Pageable } from '../pageable';

export class PaginationResponse<T> implements Page<T> {
  private content: T[];
  private pageable: Pageable;
  private totalElements: number;

  constructor(content: T[], pageable: Pageable, totalElements: number) {
    this.content = content;
    this.pageable = pageable;
    this.totalElements = totalElements;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalElements / this.pageable.size);
  }

  getTotalElements(): number {
    return this.totalElements;
  }

  map<U>(converter: (item: T) => U): Page<U> {
    const mappedContent = this.content.map(converter);
    return new PaginationResponse<U>(
      mappedContent,
      this.pageable,
      this.totalElements,
    );
  }

  getPageable(): Pageable {
    return this.pageable;
  }

  hasContent(): boolean {
    return this.content.length > 0;
  }

  getContent(): T[] {
    return this.content;
  }

  getNumberOfElements(): number {
    return this.content.length;
  }

  getSize(): number {
    return this.pageable.size;
  }

  getNumber(): number {
    return this.pageable.page;
  }

  getSort(): Sort {
    return this.pageable.sort;
  }

  hasPrevious(): boolean {
    return this.pageable.page > 0;
  }

  isFirst(): boolean {
    return this.pageable.page === 0;
  }

  isLast(): boolean {
    return this.pageable.page >= this.getTotalPages() - 1;
  }

  hasNext(): boolean {
    return this.pageable.page < this.getTotalPages() - 1;
  }
}
