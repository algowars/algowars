import { ExampleTestcaseInput } from './example-testcase-input';

export type ExampleTestcaseProperties = Readonly<{
  label: string;
  problemId: string;
  languageId: string;
}>;

export interface ExampleTestcase {}

export class ExampleTestcaseImplementation implements ExampleTestcase {
  private readonly inputs: ExampleTestcaseInput[];
  private readonly expectedOutput: string;
}
