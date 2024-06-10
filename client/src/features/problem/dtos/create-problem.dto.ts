export interface CreateProblemDto {
  title: string;
  slug: string;
  question: string;
  initialCode: string;
  rating: number | string;
  solution: string;
  testSetup: string;
  testInputs: string;
}
