import { AdditionalTestFile } from './additional-test-file';

export interface AdditionalTestFileRepository {
  findById(id: number): Promise<AdditionalTestFile | null>;
}
