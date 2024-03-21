export interface CreateSubmissionDto {
  code: string;
  problemId: number | null;
  accountId?: number;
  sub?: string;
}
