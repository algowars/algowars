export interface PageResult<T> {
  getResults(): T[];
  getPage(): number;
  getSize(): number;
  getTotalPages(): number;
}

export class PageResultImplementation<T> implements PageResult<T> {
  constructor(
    private readonly results: T[],
    private readonly page: number,
    private readonly size: number,
    private readonly totalPages: number,
  ) {}

  getResults(): T[] {
    return this.results;
  }

  getPage(): number {
    return this.page;
  }

  getSize(): number {
    return this.size;
  }

  getTotalPages(): number {
    return this.totalPages;
  }
}
