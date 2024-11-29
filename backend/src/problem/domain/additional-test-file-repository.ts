import { AdditionalTestFile } from './additional-test-file';

export interface AdditionalTestFileRepository {
  findById(id: string): Promise<AdditionalTestFile | null>;
}
