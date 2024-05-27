export interface Language {
  id: number;
  name: string;
  is_archived: false;
  source_file?: string;
  compile_cmd?: string;
  run_cmd?: string;
}
