import { AggregateRoot } from '@nestjs/cqrs';

export class Problem extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly question: string,
    private readonly slug: string,
    private readonly rating: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
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

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
