export class FindProblemBySlugResponseDto {
  readonly id: string;

  readonly title: string;

  readonly question: string;

  readonly slug: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly deletedAt: Date;

  readonly createdBy: string;
}
