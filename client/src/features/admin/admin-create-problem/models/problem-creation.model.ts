export interface ProblemCreationModel {
  initialCode: string;
  initialSolution: string;
  testFile: string;
  additionalTestFiles: {
    id: string;
    name: string;
  }[];
}
