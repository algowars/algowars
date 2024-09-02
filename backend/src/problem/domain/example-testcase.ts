export type ExampleTestcaseProperties = Readonly<{
  label: string;
  problemId: string;
  languageId: string;
}>;

export interface ExampleTestcase {}

export class ExampleTestcaseImplementation implements ExampleTestcase {}
