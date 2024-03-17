import { Test } from "../test/test";

export interface TestSetup {
  id: number;
  header: string;
  tests?: Test[];
}
