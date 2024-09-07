export type ExampleTestcaseInputEssentialProperties = Readonly<
  Required<{
    label: string;
    value: string;
  }>
>;

export type ExampleTestcaseInputProperties =
  ExampleTestcaseInputEssentialProperties;

export interface ExampleTestcaseInput {}

export class ExampleTestcaseInputImplementation
  implements ExampleTestcaseInput {}
