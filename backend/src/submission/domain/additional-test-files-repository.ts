export interface AdditionalTestFilesRepository {
  findById(id: number): Promise<AdditionalTestFile | null>;
}
