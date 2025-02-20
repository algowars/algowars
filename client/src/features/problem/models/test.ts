import { TestType } from "./test-type";

export interface Test {
  id: string;
  code?: string;
  testType: TestType;
  input?: string;
}
