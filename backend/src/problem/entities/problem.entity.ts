import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { ProblemSetup } from './problem-setup.entity';
import { Test } from './test.entity';

export class Problem extends AggregateRoot {
  constructor(
    private readonly id: string,
    private title: string,
    private readonly question: string,
    private readonly slug: string,
    private readonly rating: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private setups: ProblemSetup[] = [],
    private tests: Test[] = [],
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getQuestion() {
    return this.question;
  }

  getSlug() {
    return this.slug;
  }

  getRating() {
    return this.rating;
  }

  getSetups() {
    return [...this.setups];
  }

  addSetup(setup: ProblemSetup): void {
    this.setups.push(setup);
  }

  getTests() {
    return [...this.tests];
  }

  setTests(tests: Test[]) {
    this.tests = tests;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  updateTitle(title: string): void {
    if (!title) {
      throw new BadRequestException('A title must be defined');
    }

    this.title = title;
  }
}
