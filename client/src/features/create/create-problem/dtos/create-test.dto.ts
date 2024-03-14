import { CreateTestInputDto } from "./create-test-input.dto";

export interface CreateTestDto {
  expectedOutput: string;
  inputs: CreateTestInputDto[];
  test: string;
}
